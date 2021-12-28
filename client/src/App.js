import './App.css';
import { useState, useEffect } from 'react';
import { Container, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { Spinner } from 'reactstrap';
import axios from 'axios';
import History from './components/History';
import Vs from './components/Vs';
import Navbar from './components/Navbar';

function App() {
  const [web1, setWeb1] = useState('');
  const [web2, setWeb2] = useState('');
  const [info, setInfo] = useState(false);
  const [loader, setLoader] = useState(false);
  const [infoUrl1, setInfoUrl1] = useState([]);
  const [infoUrl2, setInfoUrl2] = useState([]);
  const [history, setHistory] = useState([]);

  const handleUrl1 = (e) => {
    if(!e.target.value.includes('http')) {
      setWeb1('http://' + e.target.value)
    } else {
      setWeb1(e.target.value)
    }
  }

  const handleUrl2 = (e) => {
    if(!e.target.value.includes('http')) {
      setWeb2('http://' + e.target.value)
    } else {
      setWeb2(e.target.value)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setInfo(false)
      setLoader(true)
      const data = await axios.get(`https://clarin-challenge.herokuapp.com/?url1=${web1}&url2=${web2}`)
      setInfoUrl1(data.data.url1)
      setInfoUrl2(data.data.url2)
      setInfo(true)
      setLoader(false)
    } catch (err) {
      console.log(err)
    }    
  }
  
  useEffect(() => {
    axios.get('https://clarin-challenge.herokuapp.com/history')
    .then((response) => {
      console.log('history',response.data)
      let reverse = response.data.reverse()
      setHistory(reverse)
    })
  }, [])


  return (
    <div className="App">
    <Navbar />
      <Container className="mt-4 containerTop">
        
        <Form className="mt-3" onSubmit={handleSubmit}>
          <div className="row mt-3">
            <div className="col">
              <input type="text" name='web1' className="form-control" onChange={handleUrl1} placeholder="https://example.com"/>
            </div>
            <div className="col">
              <input type="text" name='web2' className="form-control" onChange={handleUrl2} placeholder="https://example2.com"/>
            </div>
          </div>
          <button type="submit" className="btn btn-outline-success mt-4 mb-3"><h1><em>Analiza</em></h1></button>
        </Form>
      </Container>
    { info && <Vs web1={infoUrl1} web2={infoUrl2}/> }
    <Spinner className={loader ? 'spinner-visible' : 'spinner-hidden'} color="info" />
    <hr></hr>
    <History history={history} />
    </div>
  );
}

export default App;
