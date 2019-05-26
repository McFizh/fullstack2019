require('dotenv').config();

const DB_URL = process.env.NODE_ENV === 'test' ? process.env.TEST_DB_URL : process.env.DB_URL;

if(!DB_URL) {
  console.log('Missing database url, please set it in .env file');
  process.exit(-1);
}

module.exports = {
  DB_URL,
  PORT: process.env.PORT
};