const express = require('express');
const router = express.Router();
const Sujet = require("../models/sujetSchema")
const jwt = require("jsonwebtoken");

router.post('/sujet/add', (req, res) => {

    var sujet = new Sujet(req.body);
    sujet.save().then(function () {
        console.log(sujet);
        res.json(sujet);
    }).catch(err => res.status(400).json('Error: ' + err));
    // jwt.verify(req.token, process.env.JWT_KEY, (err) => {
    //     if (err) {

    //         res.status(403)

    //     } else {
    //         var sujet = new sujet(req.body);
    //         sujet.save().then(function () {
    //             console.log(sujet);
    //             res.json(sujet);
    //         }).catch(err => res.status(400).json('Error: ' + err));
    //     }
    // });

});

//get sujet by ID
router.get('/sujet/:id', (req, res) => {
    Sujet.findById(req.params.id).then(data => {
        //  res.send();
        res.status(200).json(data);
    }).catch(err => res.status(400).json('Error: ' + err));
});

//update sujet by ID
router.put('/sujet/update/:id', (req, res) => {

    // if (req.body.vote == true) {
    //     Sujet.findByIdAndUpdate(req.params.id, { $inc: { 'voteTrue': 1} }).then(console.log('hi')).catch(err => res.status(400).json('Error: ' + err))
    // } else {
    //     Sujet.findByIdAndUpdate(req.params.id, { $inc: { 'voteFalse': 1} }).then(console.log('not')).catch(err => res.status(400).json('Error: ' + err))
    // }
    Sujet.findByIdAndUpdate(req.params.id, req.body).then(sujet => {
        res.status(200).json(req.body);
    }).catch(err => res.status(400).json('Error: ' + err));

})

//delete sujet by ID
router.delete('/sujet/delete/:id', ensureToken, (req, res) => {
    jwt.verify(req.token, process.env.JWT_KEY, (err) => {
        if (err) {

            res.status(403)

        } else {
            sujet.findByIdAndDelete(req.params.id, req.body).then(() => {
                res.send("user deleted successfully");
                res.status(200).json();
            }).catch(err => res.status(400).json('Error: ' + err));
        }
    });

})
//get All sujet by ID
router.get('/getAllsujets', (req, res) => {

    Sujet.find().then(function (sujet) {
        res.send(sujet)
        res.status(200).json();
    }).catch(err => res.status(400).json('Error: ' + err));

    // jwt.verify(req.token, process.env.JWT_KEY, (err) => {
    //     if (err) {

    //         res.status(403)

    //     } else {
    //         sujet.find().then(function (sujet) {
    //             res.send(sujet)
    //             res.status(200).json();
    //         }).catch(err => res.status(400).json('Error: ' + err));
    //     }
    // });

})

//affect sujet for every user 
router.put('/affectusersujet/:idUser/:idSujet', (req, res) => {
    console.log("bonj");


    Sujet.findByIdAndUpdate(req.params.idSujet, {
        $push: {
            user: req.params.idsujet
        }
    }).then((sujet) => {
        res.status(200).json(sujet);

    }).catch(err => res.status(400).json('Error: ' + err));

    // jwt.verify(req.token, process.env.JWT_KEY, (err) => {
    //     if (err) {
    //         res.status(403)
    //         console.log("hi " + err);

    //     }else{
    //         User.findByIdAndUpdate(req.params.idUser, {
    //             $push: {
    //                 sujets: req.params.idsujet
    //             }
    //         }).then((user) => {
    //             res.status(200).json(user);

    //         }).catch(err => res.status(400).json('Error: ' + err));
    //     }

    //});


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