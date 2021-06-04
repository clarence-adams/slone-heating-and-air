const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json());

// allows .env file use through process.env
require('dotenv').config();

const PORT = process.env.PORT || 3001;

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  }
});

app.use('/contact', bodyParser.urlencoded({extended: false}))

app.post('/contact', (req, res) => {
  const mailData = {
    from: process.env.EMAIL,  // sender address
    to: process.env.EMAIL, // list of receivers
    subject: 'New contact',
    text: 'name: ' + req.body.name
    + ', email: ' + req.body.email
    + ', number: ' + req.body.number
    + ', address: ' + req.body.address
    + ', message: ' + req.body.message
  };
  transporter.sendMail(mailData, (err, data) => {
    if(err) {
      console.log(err)
      res.json({message: "error"})
    } else {
      console.log(data)
      res.json({message: "success"})
    }
  });
});

// Have Node serve the files for our built React app
app.use(express.static(path.resolve(__dirname, '../client/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
