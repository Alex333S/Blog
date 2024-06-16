import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import request from 'request';
import bodyParser from 'body-parser';
import querystring from 'querystring'; // For URL encoding
import nodemailer from 'nodemailer';
import fetch from 'node-fetch'; // Ensure you have 'node-fetch' installed




const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//const path = require('path');
app.use(express.static('.'));
app.use(express.json());


//TO MAKE IT WORK YOU MUST CREATE file with name strictly '.env'  IN THE ROOT DIRECTORY AND ADD YOUR EMAIL AND PASSWORD, OTHERWISE IT WILL NOT HAVE ACCESS TO THE EMAIL YOU SENDING FROM
//TO MAKE IT WORK YOU MUST CREATE file with name strictly '.env'  IN THE ROOT DIRECTORY AND ADD YOUR EMAIL AND PASSWORD, OTHERWISE IT WILL NOT HAVE ACCESS TO THE EMAIL YOU SENDING FROM
// + change the email to your email in mailOptions.

// May be we need a corporate email to send emails. Like dummy email.

async function getSecret(secretName) {
    try {
        const data = await secretsManager.getSecretValue({ SecretId: secretName }).promise();
        if ('SecretString' in data) {
            return JSON.parse(data.SecretString);
        }
    } catch (error) {
        console.error('Error fetching secret:', error);
        throw error;
    }
}

console.log('Email:', process.env.EMAIL, 'Password:', process.env.PASSWORD);
// Configure nodemailer SMTP transporter
const transporter = nodemailer.createTransport({
    host: 'smtp-mail.outlook.com',
    port: 587, // Recommended port for Outlook with STARTTLS
    secure: false, // true for 465, false for other ports. Use false for 587 with STARTTLS
    auth: {
        user: process.env.EMAIL, 
        pass: process.env.PASSWORD, 
    },
    tls: {
        ciphers: 'SSLv3' // This might be necessary if you run into connection issues
    }
});




app.post('/subscribe', async (req, res) => { 
    console.log(req.body);
    
    
    // to send an email
    const mailOptions = {
        from: 'jet1999@open.com', //PUT UR SENDER EMAIL ADDRESS WHICH WILL BE MAIN SENDER FOR EVERY EMAIL
        to: email,
        subject: 'Subscription Confirmation',
        html: '<p>You have successfully subscribed!</p><img src="cid:unique@cid" alt="Image">',
        attachments: [{
        filename: 'template.png',
        path: 'template.png', // or URL to the image
        cid: 'unique@cid' // same CID as in the img src
    }]
    };
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Mail Error:', error);
            res.status(500).send('Error sending confirmation email.');
        } else {
            console.log('Email sent:', info.response);
            res.send('Subscription successful and confirmation email sent.');
        }
    });
    res.redirect('/subscribe.html');
});



    // Email options
    

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});