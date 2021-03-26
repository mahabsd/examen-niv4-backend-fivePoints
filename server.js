var express = require('express');
var bodyParser = require('body-parser');
const hostname = "127.0.0.1";
const port = 3000;
var app =express();
let cors = require('cors');
const User = require("./models/user")

app.use(cors());

require('./db/mogoDB')
//require('./routes/scheduledemailsApi')
require('./authWithPassport/auth');
const sujetApi= require('./routes/sujetApi');
const usersApi = require('./routes/userApi')


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
app.use('/sujets', sujetApi);
app.use('/users', usersApi);



var cron = require('node-cron');

cron.schedule('* */24 * * *', () => {
    User.updateMany({}, {'voteNumber': 5 }
    ).then().catch(err => console.log(err))
});



app.listen(port,hostname, ()=>{
    console.log("server is running at http://"+hostname+":"+port);
});