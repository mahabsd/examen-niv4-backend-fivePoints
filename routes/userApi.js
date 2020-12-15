const express = require('express');
const router = express.Router();
const User = require("../models/user")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
//add new user
router.post('/user/add/', (req, res) => {
    var user = new User(req.body);
    bcrypt.hash(req.body.password, 10, function (err, hash) {
        user.password = hash;
        user.save().then(item => {
            res.status(200).json();
            console.log("datea saved " + user.password);
        }).catch(err => {
            console.log(err);
        });
    });
    res.send(req.body);
    // user.save().then(function (){
    //     res.json(user);
    //     res.status(200).json();
    //     User.findById
    //     console.log(user);
    // }).catch(err => res.status(400).json('Error: ' + err));

});

//get by Id
router.get('/user/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            User.findById(req.params.id).populate('todos').exec().then(data => {
                res.status(200).json(data);
                // res.send(data); la meme que json(data)
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
});
//delete by Id
router.delete('/user/delete/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {

            User.findByIdAndDelete(
                req.params.id, req.body).then(function () {
                res.status(200).json("user deleted successfully");

            }).catch(err => res.status(400).json('Error: ' + err));
        }

    })

});

//update by Id
router.put('/user/update/:id', ensureToken, (req, res) => {

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
  User.findByIdAndUpdate(req.params.id, req.body).then(function (user) {
        res.status(200).json(
             req.body,
        );
        // res.send();
    }).catch(err => res.status(400).json('Error: ' + err));
        }
    });
  
});
//get All users
router.get('/getAllusers', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            User.find().populate('todos').exec().then(function (users) {
                res.send(users)
                res.status(200).json();
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });


});
//affect todo for every user 
router.put('/affectuserTask/:idUser/:idTodo',ensureToken, (req, res) => {
    console.log("bonj");

    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {
            res.status(403)
            console.log("hi " + err);

        }else{
            User.findByIdAndUpdate(req.params.idUser, {
                $push: {
                    todos: req.params.idTodo
                }
            }).then((user) => {
                res.status(200).json(user);
        
            }).catch(err => res.status(400).json('Error: ' + err));
        }

    });
    
   
});

//affect todo for every user ancienne methode  :

// router.put('/affectuserTask/:idUser/:idTodo', (req, res) => {
//     User.findById(req.params.idUser).then((user) => {
//             user.todos.push(req.params.idTodo)
//             res.status(200).json(user);
//             user.save();
//             res.send(user)
//     }).catch(err => res.status(400).json('Error: ' + err));
// })

//splice todo for every user 
router.delete('/deleteuserTask/:idUser/:idTodo', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            User.findByIdAndUpdate(req.params.idUser, {
                $pull: {
                    todos: req.params.idTodo
                }
            }).then((user) => {
                res.status(200).json(user);
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

});


//delete todo for every user ancienne methode  :

// router.delete('/deleteuserTask/:idUser/:idTodo', (req, res) => {
//     User.findById(req.params.idUser).then((user) => {
//         var index = user.todos.indexOf(req.params.idTodo)
//             user.todos.splice(index, 1)
//             res.status(200).json(user);
//             user.save();
//             res.send(user)
//     }).catch(err => res.status(400).json('Error: ' + err));
// })

//login
router.post('/user/login/', (req, res) => {

    User.findOne({
        email: req.body.email
    }).then(user => {
        //if user not exist then return status 400
        if (!user) return res.status(400).json({
            msg: "User does not exist"
        })

        bcrypt.compare(req.body.password, user.password, (err, data) => {
            //if error than throw error
            if (err) throw err

            //if both match then you can do anything
            if (data) {
                var token = jwt.sign(req.body, 'secret');
                return res.status(200).json({
                    user,
                    token: token,
                    msg: "Login success"
                })
            } else {
                return res.status(401).json({
                    msg: "Invalid credencial "
                })
            }

        })

    })

});

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