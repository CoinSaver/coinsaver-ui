const express = require('express');
const parser = require('body-parser');
const path = require('path');
// const db = require('../database/db.js'); //When we add the extremely complex coinsaver db

const app = express();
const router = express.Router();
// const router = require('./router.js'); // After we restructure


let port = 9001;

app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));


app.use('/main', router);
app.listen(port, () => {
  // console.log('Server is running on port: ' + port)
  console.log('What does the server say about its port level? ITS OVER ' + (port-1).toString() +'!!');
})

