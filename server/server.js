const express = require('express');
const parser = require('body-parser');
const path = require('path');
const router = require('./router.js');
const cors = require('cors')
// const db = require('../database/db.js'); //When we add the extremely complex coinsaver db
const PRIVATE_IP = require('../config/config.js').AWS.PRIVATE_IP || null

const app = express();

// const port = 443;
const port = 9001;

// app.use(function(req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*');
//   res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   res.header('Access-Control-Allow-Methods', ['GET, POST, PUT, DELETE', 'OPTIONS'])
//   next();
// })

app.use(cors({
  allowedHeaders: 'Content-Type, authorization',
  origin: '*',
  methods: ['GET, POST, PUT, DELETE', 'OPTIONS']
}));


// app.all('/*', function(req,res,next){
//   res.sendFile('index.html', {root: './client'})
// });


app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, '../client')));

// app.all('/*', function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Authorization, Content-Type");
//   res.header("Access-Control-Allow-Methods", 'GET, POST, PUT ,DELETE');
//   next();
// })


app.use(router);

app.listen(port, PRIVATE_IP, () => {
  // console.log(`AWS Server is running on Port: ${port}`);
  console.log(`What does the server say about its port number? ITS OVER ${(port - 1).toString()}!! Port: ${port}`);
});



