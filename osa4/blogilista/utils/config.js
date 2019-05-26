require('dotenv').config();

if(!process.env.DB_URL) {
  console.log('Missing database url, please set it in .env file');
  process.exit(-1);
}

module.exports = {
  DBURL: process.env.DB_URL,
  PORT: process.env.PORT
};