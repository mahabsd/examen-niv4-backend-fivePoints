const mongoose = require('mongoose');
var schema = mongoose.Schema;


var todoSchema = new schema({
    title: {
        type: String
    },
    description: {
        type: String
    },

})

module.exports = mongoose.model("todoSchema", todoSchema)