const mongoose=require('mongoose');
const todoApi= require('../routes/todoApi');
var schema = mongoose.Schema;
var userSchema = new schema({
    email : {type : String},
    password : {type : String},
    todos :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'todoSchema' }]
});

module.exports = mongoose.model("user", userSchema)