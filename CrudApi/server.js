// server.js

const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors'),
    mongoose = require('mongoose'),
    config = require('./db');

mongoose.set('useFindAndModify', false);
const empRoute = require('./routes/emp.routes');
mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true,useUnifiedTopology: true }).then(
  () => {console.log('Database is connected') },
  err => { console.log('Can not connect to the database'+ err)}
);

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use('/emp', empRoute);
const port = process.env.PORT || 4000;

const server = app.listen(port, function(){
  console.log('Listening on port ' + port);
});