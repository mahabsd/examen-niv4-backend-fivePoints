const mongoose=require('mongoose');
const todoApi= require('../routes/todoApi');
var schema = mongoose.Schema;
var userSchema = new schema({
    email : {type : String, required: true, unique: true},
    password : {type : String, required: true, unique: true},
    todos :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'todoSchema' }],
    image : {type : String}
});

module.exports = mongoose.model("user", userSchema)