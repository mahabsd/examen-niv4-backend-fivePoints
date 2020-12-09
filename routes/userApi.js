const express = require('express');
const router = express.Router();
const User = require("../models/user")

//add new user
router.post('/user/add/', (req, res) => {
    var user = new User(req.body);
    user.save();
    User.findById
    console.log(user);
    res.json(user);
});

//get by Id
router.get('/user/:id', (req, res) => {
    User.findById(req.params.id).then(data => {
        res.status(200).json(data);
        res.send(data);
    }).catch(err => res.status(400).json('Error: ' + err));
});
//delete by Id
router.delete('/user/delete/:id', (req, res) => {
    User.findByIdAndDelete(
         req.params.id
    , req.body).then(function () {
        User.findById(
             req.params.id
        ).then(function () {
            res.status(200).json();
            res.send("user deleted successfully");
        })
    }).catch(err => res.status(400).json('Error: ' + err));
});

//update by Id
router.put('/user/update/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body).then(function (user) {
        res.status(200).json(user);
        res.send(req.body);
    }).catch(err => res.status(400).json('Error: ' + err));
});
//get All users
router.get('/getAllusers', (req, res) => {
    User.find().then(function (users) {
        res.send(users)
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));
})
//affect todo for every user 
router.put('/affectuserTask/:idUser/:idTodo', (req, res) => {
    User.findByIdAndUpdate(req.params.idUser, {$push : {todos : req.params.idTodo}}).then((user) => {
            res.status(200).json(user);

    }).catch(err => res.status(400).json('Error: ' + err));
})

//affect todo for every user anvcienne methode  :

// router.put('/affectuserTask/:idUser/:idTodo', (req, res) => {
//     User.findById(req.params.idUser).then((user) => {
//             user.todos.push(req.params.idTodo)
//             res.status(200).json(user);
//             user.save();
//             res.send(user)
//     }).catch(err => res.status(400).json('Error: ' + err));
// })

//splice todo for every user 
router.delete('/deleteuserTask/:idUser/:idTodo', (req, res) => {
    User.findByIdAndUpdate(req.params.idUser, {$pull : {todos : req.params.idTodo}}).then((user) => {
            res.status(200).json(user);
    }).catch(err => res.status(400).json('Error: ' + err));
})



//delete todo for every user anvcienne methode  :

// router.delete('/deleteuserTask/:idUser/:idTodo', (req, res) => {
//     User.findById(req.params.idUser).then((user) => {
//         var index = user.todos.indexOf(req.params.idTodo)
//             user.todos.splice(index, 1)
//             res.status(200).json(user);
//             user.save();
//             res.send(user)
//     }).catch(err => res.status(400).json('Error: ' + err));
// })
module.exports = router;