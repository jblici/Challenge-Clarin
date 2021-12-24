require('dotenv').config();

const { apikey } = process.env;

const BASE_URL = `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=`;
const API_KEY = apikey

module.exports = { BASE_URL, API_KEY };