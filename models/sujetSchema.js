const mongoose = require('mongoose');
var schema = mongoose.Schema;


var sujetSchema = new schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    vote : false,
    userId : {
        type: String
    },
    user :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

})

module.exports = mongoose.model("sujetSchema", sujetSchema)