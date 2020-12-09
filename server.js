var express = require('express');
var bodyParser = require('body-parser');
const hostname = "127.0.0.1";
const port = 3000;
var app =express();
const todoApi= require('./routes/todoApi');
const usersApi = require('./routes/userApi')
require('./db/mogoDB')
require("nodemailer");

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/todos', todoApi);
app.use('/users', usersApi);

app.listen(port,hostname, ()=>{
    console.log("server is running at http://"+hostname+":"+port);
});