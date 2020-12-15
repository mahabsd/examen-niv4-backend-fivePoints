const express = require('express');
const router = express.Router();
const Todo = require("../models/todoSchema")
const jwt = require("jsonwebtoken");

router.post('/todo/add', ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            var todo = new Todo(req.body);
            todo.save().then(function () {
                console.log(todo);
                res.json(todo);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//get todo by ID
router.get('/todo/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {

            Todo.findById(req.params.id).then(data => {
                res.send(data);
                res.status(200).json();
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});

//update todo by ID
router.put('/todo/update/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Todo.findByIdAndUpdate(req.params.id, req.body).then(function () {
                res.send(req.body);
                res.status(200).json();
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})

//delete todo by ID
router.delete('/todo/delete/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Todo.findByIdAndDelete(req.params.id, req.body).then(() => {
                res.send("user deleted successfully");
                res.status(200).json();
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})
//get All todo by ID
router.get('/getAllTodos', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            Todo.find().then(function (todo) {
                res.send(todo)
                res.status(200).json();
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})

//authentification
function ensureToken(req, res, next) {
    const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") {

        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];
        req.token = bearerToken;
        next();

    } else {
        console.log(bearerHeader);
        res.sendStatus(401);
    }
};
module.exports = router;