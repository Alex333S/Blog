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



//TO MAKE IT WORK YOU MUST CREATE file with name strictly '.env'  IN THE ROOT DIRECTORY AND ADD YOUR EMAIL AND PASSWORD, OTHERWISE IT WILL NOT HAVE ACCESS TO THE EMAIL YOU SENDING FROM
//TO MAKE IT WORK YOU MUST CREATE file with name strictly '.env'  IN THE ROOT DIRECTORY AND ADD YOUR EMAIL AND PASSWORD, OTHERWISE IT WILL NOT HAVE ACCESS TO THE EMAIL YOU SENDING FROM
// + change the email to your email in mailOptions.

// May be we need a corporate email to send emails. Like dummy email.

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
    const email = req.body.email; 
    const apiKey = 'nope'; // Your Moosend API key
    const listId = 'nope'; 
    const moosendApiUrl = `https://api.moosend.com/v3/lists/${listId}/subscribers.json/subscribe?apikey=${apiKey}`;

    const subscriberData = {
        Email: email, 
        Name: 'S',
    };
    
    try {
        const response = await fetch(moosendApiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscriberData)
        });
    
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        // Attempt to parse the response as JSON
        let data;
        try {
            data = await response.json();
        } catch (error) {
            // If parsing fails, log the error and throw to skip to the catch block
            console.error('Failed to parse JSON:', error);
            throw new Error('Failed to parse JSON response');
        }
    
        // Proceed with your logic only if JSON parsing was successful
        if (data && data.Code === 0) {
            
        } else {
            console.log('Moosend subscription error:', data.Error);
            res.status(500).send('Error subscribing to Moosend.');
        }
    } catch (error) {
        console.log('Error:', error);
        
    }
    
    // to send an email
    const mailOptions = {
        from: '......', //PUT UR SENDER EMAIL ADDRESS WHICH WILL BE MAIN SENDER FOR EVERY EMAIL
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