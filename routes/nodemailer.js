const nodemailer = require('nodemailer');
const express = require('express');
const router = express.Router();


// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport("SMTP", {
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    service: "Gmail",
    auth: {
        user: 'mahabsd@gmail.com',
        pass: 'Mahmouhaa-28'
    }
});

// send mail with defined transport object
router.post('/send', function (req, res) {

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: 'mahabsd@gmail.com',
            to: 'benayedghaith0000@gmail.com',
            // subject: req.body.subject, // Subject line
            // text: req.body.text, // plaintext body
            html: '<b>Hello world 🐴</b>' // html body
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return res.send(error);
            }
            return res.send("mail send successfully");
        });

})

module.exports = router;