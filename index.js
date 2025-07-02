const express = require('express');
const africastalking = require('africastalking');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Africa's Talking credentials
const AT_USERNAME = process.env.AFRICASTALKING_USERNAME || 'womenintechcodex';
const AT_API_KEY = process.env.AFRICASTALKING_API_KEY || 'atsk_778a3b6aa8ed7eae47ee451a553d7af7f55c215228586f5320585df513fbf5b2002c7f74';
const AT_SENDER_ID = 'AFTKNG';

// Initialize Africa's Talking SDK
const africastalkingClient = africastalking({
    apiKey: AT_API_KEY,
    username: AT_USERNAME
});
const sms = africastalkingClient.SMS;

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

// In-memory storage for demo purposes (replace with database in production)
const users = {};

// Welcome message template
const WELCOME_MESSAGE = "Welcome {name}! Thank you for joining our platform. We're excited to have you!";

// Helper function to validate phone number
const validatePhoneNumber = (phoneNumber) => {
    return phoneNumber && phoneNumber.startsWith('+') && phoneNumber.length >= 10;
};

// POST /sms/send_sms - Register a new user and send a welcome SMS
app.post('/sms/send_sms', async (req, res) => {
    const { name, phone_number } = req.body;

    // Validate request body
    if (!name || !phone_number) {
        return res.status(400).json({ detail: 'Name and phone_number are required' });
    }

    // Validate phone number format
    if (!validatePhoneNumber(phone_number)) {
        return res.status(400).json({
            detail: 'Phone number must be in international format (e.g., +2547XXXXXXXX)'
        });
    }

    // Store user
    const userId = uuidv4();
    users[userId] = {
        name,
        phone_number
    };

    // Prepare and send welcome SMS
    const message = WELCOME_MESSAGE.replace('{name}', name);
    try {
        const response = await sms.send({
            from: AT_SENDER_ID,
            to: phone_number,
            message
        });

        const recipient = response.SMSMessageData.Recipients[0];
        if (recipient.status === 'Success') {
            return res.status(200).json({
                message: 'User registered and welcome SMS sent successfully',
                user_id: userId,
                phone_number
            });
        } else {
            return res.status(500).json({
                detail: `Failed to send welcome SMS: ${recipient.status}`
            });
        }
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        return res.status(500).json({
            detail: `Error sending SMS: ${error.message}`
        });
    }
});

// GET /users - Retrieve all registered users
app.get('/users', (req, res) => {
    return res.status(200).json({ users });
});

// POST /send-welcome/:userId - Resend welcome SMS to an existing user
app.post('/send-welcome/:userId', async (req, res) => {
    const { userId } = req.params;

    // Check if user exists
    if (!users[userId]) {
        return res.status(404).json({ detail: 'User not found' });
    }

    const user = users[userId];
    const message = WELCOME_MESSAGE.replace('{name}', user.name);

    try {
        const response = await sms.send({
            from: AT_SENDER_ID,
            to: user.phone_number,
            message
        });

        const recipient = response.SMSMessageData.Recipients[0];
        if (recipient.status === 'Success') {
            return res.status(200).json({
                message: 'Welcome SMS sent successfully',
                user_id: userId
            });
        } else {
            return res.status(500).json({
                detail: `Failed to send welcome SMS: ${recipient.status}`
            });
        }
    } catch (error) {
        console.error('Error sending SMS:', error.message);
        return res.status(500).json({
            detail: `Error sending SMS: ${error.message}`
        });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});