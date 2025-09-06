import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AffordmedUI() {
    const [registrationResponse, setRegistrationResponse] = useState('');
    const [authResponse, setAuthResponse] = useState('');
    const [logResponse, setLogResponse] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        mobileNo: '',
        githubUsername: '',
        rollNo: '',
        accessCode: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRegister = async () => {
        try {
            const response = await axios.post('http://localhost:5000/evaluation-service/register', formData);
            setRegistrationResponse(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setRegistrationResponse('Registration failed');
            console.error(error);
        }
    };

    const handleAuth = async () => {
        const authData = {
            email: formData.email,
            name: formData.name,
            rollNo: formData.rollNo,
            accessCode: formData.accessCode,
            clientID: '4135fd84-9dea-4553-8b38-f90af025e142',       // Replace with actual values
            clientSecret: '965ad390-1cb2-4fc8-911e-78d31c652358'
        };
        try {
            const response = await axios.post('http://localhost:5000/evaluation-service/auth', authData);
            setAuthResponse(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setAuthResponse('Auth failed');
            console.error(error);
        }
    };

    const handleLog = async () => {
        const logData = {
            stack: 'backend',
            level: 'error',
            package: 'handler',
            message: 'received string, expected bool'
        };
        try {
            const response = await axios.post('http://localhost:5000/evaluation-service/logs', logData);
            setLogResponse(JSON.stringify(response.data, null, 2));
        } catch (error) {
            setLogResponse('Log submission failed');
            console.error(error);
        }
    };

    return (
        <div style={{ padding: '40px' }}>
            <h2>User Registration</h2>
            <input type="email" name="email" placeholder="Email" onChange={handleChange} /><br /><br />
            <input type="text" name="name" placeholder="Name" onChange={handleChange} /><br /><br />
            <input type="text" name="mobileNo" placeholder="Mobile No" onChange={handleChange} /><br /><br />
            <input type="text" name="githubUsername" placeholder="GitHub Username" onChange={handleChange} /><br /><br />
            <input type="text" name="rollNo" placeholder="Roll No" onChange={handleChange} /><br /><br />
            <input type="text" name="accessCode" placeholder="Access Code" onChange={handleChange} /><br /><br />
            <button onClick={handleRegister}>Register</button>

            <h3>Registration Response:</h3>
            <pre>{registrationResponse}</pre>

            <hr />

            <h2>Auth Token</h2>
            <button onClick={handleAuth}>Get Auth Token</button>
            <h3>Auth Response:</h3>
            <pre>{authResponse}</pre>

            <hr />

            <h2>Submit Log</h2>
            <button onClick={handleLog}>Submit Log</button>
            <h3>Log Response:</h3>
            <pre>{logResponse}</pre>
        </div>
    );
}

export default AffordmedUI;
