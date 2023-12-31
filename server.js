const express = require('express');
const dotenv =  require('dotenv').config();

const connectDb = require('./src/db/mongoose')

const app = express();
const port = process.env.PORT || 3000;

// Express includes body parsing by default
app.use(express.json());

app.use('/',require('./src/routes/index'));

app.listen(port,function(){
  console.log(`Server is listening on port- ${port}`);
})