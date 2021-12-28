require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
const mysql = require('mysql');

const { DB_PASS, DB_USER, DB_HOST, DB_DATABASE } = process.env;
const { BASE_URL, API_KEY } = require('./constants')
const port = process.env.PORT || 3001

const server = express();

server.use(cors())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json());
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
  });

const db = mysql.createConnection({
    user: DB_USER || 'root',
    host: DB_HOST || 'Localhost',
    password: DB_PASS,
    database: DB_DATABASE || 'clarin'
});

server.get('/', compareUrls)

server.get('/history', fetchHistory)

async function compareUrls (req, res, next) {
    const { url1, url2 } = req.query
    let ids = [];

    const webPromise1 = axios.get(`${BASE_URL}${url1}&key=${API_KEY}`)
    const webPromise2 = axios.get(`${BASE_URL}${url2}&key=${API_KEY}`)

    Promise.all([webPromise1, webPromise2])
    .then(response => {
        let [web1, web2] = response;

        const resultWeb1 = [
            url1,
            web1.data.lighthouseResult.audits['speed-index']['displayValue'],
            web1.data.lighthouseResult.audits['interactive']['displayValue'],
        ];
        const resultWeb2 = [
            url2,
            web2.data.lighthouseResult.audits['speed-index']['displayValue'],
            web2.data.lighthouseResult.audits['interactive']['displayValue'],
        ];
      
        res.send({ url1: resultWeb1, url2: resultWeb2 });
      
        db.query('INSERT INTO url_stats (name, speed, time) VALUES (?,?,?)',
        [url1, web1.data.lighthouseResult.audits['speed-index']['displayValue'], web1.data.lighthouseResult.audits['interactive']['displayValue']],
        function (err, result) {
            if(err) console.log(err);
            setIds(result.insertId)
        })
        
        db.query('INSERT INTO url_stats (name, speed, time) VALUES (?,?,?)',
        [url2, web2.data.lighthouseResult.audits['speed-index']['displayValue'], web2.data.lighthouseResult.audits['interactive']['displayValue']],
        function (err, result) {
            if(err) console.log(err);
            setIds(result.insertId)
        })
        
        function setIds(value) {
            ids.push(value);
            if (ids.length >= 2) {
                db.query('INSERT INTO comparison (id_url_1, id_url_2) VALUES (?,?)',
                [ids[0], ids[1]],
                function (err, result) {
                    if(err) throw(err)
                    console.log('Insert into comparison table success')
                })
            }
        }
    })
    .catch(error => {
      console.log(error)
      res.send({ message: "Algo salio mal!" });
    });
}

function fetchHistory(req,res,next) {
    try {
        query = 'SELECT comparison.id, id_url_1.name AS url_1, id_url_1.speed AS speed_1, id_url_1.time AS time_1, id_url_2.name AS url_2, id_url_2.speed AS speed_2, id_url_2.time AS time_2 FROM comparison INNER JOIN url_stats id_url_1 ON id_url_1.id = comparison.id_url_1 INNER JOIN url_stats id_url_2 ON id_url_2.id = comparison.id_url_2';
        db.query(query, 
        function(err, result) {
            if (err) console.log(err)
            if(result.length >= 10) {
                let shortResult = result.splice(result.length - 10, result.length)
                res.send(shortResult.reverse())
            } else {
                res.send(result.reverse())
            }
        })
    } catch (error) {
        console.log(error)
    }
}

server.listen(port, () => {
    console.log(`listening to port ${port}`)
})