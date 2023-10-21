const express = require('express');
const dotenv =  require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use('/',require('./routes/index'));

app.listen(port,function(){
  console.log(`Server is listening on port- ${port}`);
})