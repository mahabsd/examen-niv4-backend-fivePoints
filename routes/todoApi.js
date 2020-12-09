const express = require('express');
const router = express.Router();
const Todo = require("../models/todoSchema")

router.post('/todo/add', (req, res) => {
    var todo = new Todo(req.body);
    todo.save().then(function (){
        console.log(todo);
        res.json(todo);
    }).catch(err => res.status(400).json('Error: ' + err));
});

//get todo by ID
router.get('/todo/:id', (req, res) => {
    Todo.findById(req.params.id).then(data => {
        res.send(data);
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));
});

//put todo by ID
router.put('/todo/update/:id', (req, res) => {
    Todo.findByIdAndUpdate(req.params.id, req.body).then(function () {
        res.send(req.body);
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));
})

//delete todo by ID
router.delete('/todo/delete/:id', (req, res) => {
    Todo.findByIdAndDelete(req.params.id, req.body).then(() => {
        res.send("user deleted successfully");
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));
})
//get All todo by ID
router.get('/getAllTodos', (req, res) => {
    Todo.find().then(function (todo) {
        res.send(todo)
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));
})
module.exports = router;