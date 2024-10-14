const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const Imap = require('imap-simple');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', async (req, res) => {
  const subject = req.body.subject;
  const message = req.body.message;
  const email = req.body.email;
  const name = req.body.name;

  const imapConfig = {
    imap: {
      user: 'contact@dmkservices.fr',
      password: 'zS8-1Pfe3G_4Djy',
      host: 'mail.dmkservices.fr',
      port: 143,
      // tls: true,
      authTimeout: 3000
    }
  };

  const transporter = nodemailer.createTransport({
    host: "mail.dmkservices.fr",
    port: 587,
    auth: {
      user: 'noreply@dmkservices.fr',
      pass: 'wZ5-u9cHEnwpJ78'
    }
  });

  const senderEmail = 'contact@dmkservices.fr';
  const mailOptions = {
    from: senderEmail,
    to: 'contact@dmkservices.fr',
    subject: '',
    text: `
      Name: ${name}
      Email: ${email}
      Subject: ${subject}
      Message: ${message}
    `
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);

    const connection = await Imap.connect(imapConfig);
    await connection.openBox('INBOX');
    await connection.append(info.response, { mailbox: 'Sent' });

    res.status(200).send('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

app.listen(port, () => {
  console.log(`Server listening at port ${port}`);
});