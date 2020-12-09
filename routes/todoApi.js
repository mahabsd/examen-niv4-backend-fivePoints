const express = require('express');
const router = express.Router();
const Todo = require("../models/todoSchema")

router.post('/todo/add', (req, res) => {
    var todo = new Todo(req.body);
    todo.save()
    console.log(todo);
    res.json(todo);
});

//get todo by ID
router.get('/todo/:id', (req, res) => {
    Todo.findById(req.params.id).then(data => {
        res.send(data);
    })
});

//put todo by ID
router.put('/todo/update/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send(req.body);
    })
})

//delete todo by ID
router.delete('/todo/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, req.body).then(() => {
        res.send("user deleted successfully");
    })
})
//get All todo by ID
router.get('/todo/getAllTodos', (req, res) => {
    Todo.find().then(function (todo) {
        res.send(todo)
    })
})
module.exports = router;