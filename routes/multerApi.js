const multer  = require('multer');
const express = require('express');
const User = require("../models/user")
const router = express.Router();
/* We will upload the file on server local directory, not in database. We will store the directory path into the database. */

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './img/');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null,file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

//Upload route
router.post('/upload/:idUser', upload.single('image'), (req, res, next) => {
    User.findByIdAndUpdate(req.params.idUser, {image : req.file.path} ).then(data => {
        res.send(data);
    })
    // try {
    //     console.log(req.file.path);
    //     return res.status(201).json({
    //         message: 'File uploded successfully '+req.file.filename

    //     });
    // } catch (error) {
    //     console.error(error);
    // }
});

module.exports = router;
