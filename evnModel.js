const envv= require('dotenv');
envv.config();
const port=process.env.PORT;
const connection_string=process.env.CONNECTION_STRING;

module.exports={port,connection_string}