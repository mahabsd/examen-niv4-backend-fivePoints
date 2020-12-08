
const mongoose = require('mongoose');
var schema = mongoose.Schema;


var todoSchema = new schema({
name : {type : String},
lastname : {type : String},
age : {type : Number}
})

module.exports = mongoose.model("todoSchema", todoSchema)