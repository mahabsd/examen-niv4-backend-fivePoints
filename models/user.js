const mongoose=require('mongoose');
const todoApi= require('../routes/sujetApi');
var schema = mongoose.Schema;
var userSchema = new schema({
    firstName: { type: String },
    lastName:    { type: String},
    email : {type : String, required: true, unique: true},
    password : {type : String, required: true, unique: true},
    sujets :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'sujetSchema' }],
    voteNumber : {type : Number}
});

module.exports = mongoose.model("user", userSchema)