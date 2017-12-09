const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./router.js');
// const db = require('../database/db.js'); //When we add the extremely complex coinsaver db
const PRIVATE_IP = require('../config/config.js').AWS.PRIVATE_IP || null

const app = express();

// const port = 443;
const port = 9001;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

app.use(router);

app.listen(port, PRIVATE_IP, () => {
  // console.log(`AWS Server is running on Port: ${port}`);
  console.log(`What does the server say about its port number? ITS OVER ${(port - 1).toString()}!! Port: ${port}`);
});



