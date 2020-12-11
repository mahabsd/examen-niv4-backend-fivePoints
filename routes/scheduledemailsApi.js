const cron = require('node-cron');
 require('express');
const nodemailer = require('nodemailer');


// Create mail transporter.
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

// Sending emails every Wednesday.
cron.schedule('* * * * *', function() {
    console.log('---------------------');
    console.log('Running Cron Job');
  
    let messageOptions = {
      from: 'mahabsd@gmail.com',
      to: 'mahabsd@gmail.com',
      subject: 'Scheduled Email',
      text: 'Hi there. This email was automatically sent by us.'
    };
  
    transporter.sendMail(messageOptions, function(error) {
      if (error) {
        throw error;
      } else {
        console.log('Email successfully sent!');
      }
    });
  });

  module.exports = cron;