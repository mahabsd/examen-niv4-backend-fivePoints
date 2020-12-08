var express = require('express');
var bodyParser = require('body-parser');
const hostname = "127.0.0.1";
const port = 3000;
var app =express();
const todoApi= require('./routes/todoApi');
require('./db/mogoDB')

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/todos', todoApi );



app.listen(port,hostname, ()=>{
    console.log("server is running at http://"+hostname+":"+port);
});