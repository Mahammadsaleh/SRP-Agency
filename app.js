const express = require('express');
const path = require('path');
const app = express();
const port = 3000;
const nodemailer = require('nodemailer');

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.get('/api', (req, res) => {
  res.json(`HTTP GET request received`);
});

app.use(express.static(path.join(__dirname, 'public')));

app.post('/send_email', (req, res) => {
    const { name, email, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'mehemmedsalehabbas@gmail.com',
          pass: 'zwkv riha odjj vcyo'
        }
    });

    const mailOptions = {
        from: email,
        to: 'mehemmedsalehabbas@gmail.com',
        subject: `Subject: ${subject}`,
        text: `From: ${name}\nEmail: ${email}\n\n${message}`
    };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.json({ message: 'error' });
        } else {
          console.log('Email sent: ' + info.response);
          res.json({ message: 'success' });
        }
    });
});

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
