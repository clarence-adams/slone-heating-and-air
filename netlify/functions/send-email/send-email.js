const nodemailer = require('nodemailer')

// allows .env file use through process.env
require('dotenv').config()

// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    }
})

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
const handler = async (event, context) => {
  const mailData = {
    from: process.env.EMAIL,  // sender address
    to: process.env.EMAIL, // list of receivers
    subject: 'New contact',
    text: 'name: ' + JSON.parse(event.body).name
    + ', email: ' + JSON.parse(event.body).email
    + ', number: ' + JSON.parse(event.body).number
    + ', address: ' + JSON.parse(event.body).address
    + ', message: ' + JSON.parse(event.body).message
  }

  try {
    transporter.sendMail(mailData)
    return {
      statusCode: 200,
      body: JSON.stringify({message: 'success'})
    }
  } catch (err) {
    console.error(err)
    return {
      statusCode: 500,
      body: JSON.stringify({message: 'error'})
    }
  }
}

module.exports = { handler }
