'use strict';

const express = require("express");
const app = express();
const routes = require("./routes");

const jsonParse = require("body-parser").json; 
const jsonParser = jsonParse();
const logger = require("morgan");

app.use(logger('dev'));
app.use(jsonParser); 

let mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/qa");

let db = mongoose.connection;

db.on('error', function(err){
    console.error('connection error:', err);
});

db.once('open', function(){
    console.log('db connection succesful');
});

app.use('/questions',routes);

//catch 404 and forward to error handler
app.use(function(req,res,next){
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});

//ERROR handler

app.use(function(err, req, res, next){
    res.status(err.status || 500),
    res.json({
        message: err.message
    });
});

let port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log('express server is running on port', port);
});

