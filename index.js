const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const port = 7002;

app.use(express.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const subject = req.body.subject;
  const message = req.body.message;
  const email = req.body.email;
  const name = req.body.name;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: "smtp.forwardemail.net",
    port: 465,
    secure: true,
    auth: {
      user: 'achille.diris@gmail.com',
      pass: 'fuvg hhiu ponr fsqb'
    }
  });

  const senderEmail = 'achille.diris@gmail.com';
  const mailOptions = {
    from: senderEmail,
    to: 'achilleaubinfanomezantsoa@gmail.com',
    subject: '',
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).json('Error sending email');
    } else {
      res.status(200).json('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});