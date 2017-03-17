/* jshint node: true */
"use strict";
// External dependencies
let express = require("express");
let bodyParser = require("body-parser");
let morgan = require("morgan");
let path = require("path");
// Our files
let users = require("./routes/users");
let nodes = require("./routes/nodes");
let register = require("./routes/register");
let pullMaster = require("./pullMaster");
let startup = require('./startup');


startup.checkIfRegister();
let app = express();

process.env.PORT = process.env.PORT || 8000;


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// logs requests to the console.
app.use(morgan("dev"));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//app.use('/api/users', users);
//app.use('/api/nodes', nodes);
app.use('/list', users);
app.use('/nodes', nodes);
app.use('/register', register);


app.get('/',function(req,res){
    res.sendFile(path.join(__dirname+'/views/home.html'));
});

/*
app.get('/', function(req, res) {
    res.render(index);
});
*/
app.listen(process.env.PORT);
console.log("Server is listening to port " + process.env.PORT);


pullMaster.start();

module.exports = app;
