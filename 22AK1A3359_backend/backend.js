const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { randomUUID } = require('crypto');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let registeredUsers = [];

app.post('/evaluation-service/register', (req, res) => {
    const { email, name, mobileNo, githubUsername, rollNo, accessCode } = req.body;

    if (registeredUsers.find(u => u.email === email)) {
        return res.json({
            message: 'You can register only once. Do not forget to save your clientID and clientSecret; you cannot retrieve them again.',
            email, name, rollNo, accessCode,
            clientID: randomUUID(),
            clientSecret: randomUUID()
        });
    }

    const clientID = randomUUID();
    const clientSecret = randomUUID();

    registeredUsers.push({ email, name, mobileNo, githubUsername, rollNo, accessCode, clientID, clientSecret });

    return res.json({
        message: 'Registration successful. Please save your clientID and clientSecret.',
        email,
        name,
        rollNo,
        accessCode,
        clientID,
        clientSecret
    });
});

app.post('/evaluation-service/auth', (req, res) => {
    const { email, name, rollNo, accessCode, clientID, clientSecret } = req.body;

    const user = registeredUsers.find(
        u =>
            u.email === email &&
            u.name === name &&
            u.rollNo === rollNo &&
            u.accessCode === accessCode &&
            u.clientID === clientID &&
            u.clientSecret === clientSecret
    );

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    return res.json({
        'token type': 'Bearer',
        'access_token': randomUUID(),
        'expires_in': Date.now() + 3600 * 1000  // Token expiration timestamp
    });
});

app.post('/evaluation-service/logs', (req, res) => {
    const { stack, level, package: pkg, message } = req.body;

    if (typeof message !== 'string') {
        return res.status(400).json({ message: 'Field "message" must be string' });
    }

    const logID = randomUUID();

    return res.json({
        logID,
        message: 'log created successfully'
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
