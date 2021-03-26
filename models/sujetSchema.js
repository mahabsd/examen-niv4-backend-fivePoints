const mongoose = require('mongoose');
var schema = mongoose.Schema;


var sujetSchema = new schema({
    title: {
        type: String
    },
    description: {
        type: String
    },
    vote : {type : Boolean},
    voteTrue : {type : Number, default: 0},
    voteFalse : {type : Number, default: 0},
    userId : {
        type: String
    },
    user :   [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],

})

module.exports = mongoose.model("sujetSchema", sujetSchema)