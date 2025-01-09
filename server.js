const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());

// Simulated database
const users = [];

// Route to handle registration
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    // Validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'All fields are required!' });
    }

    // Check if username or email is already registered
    const userExists = users.find(
        (user) => user.username === username || user.email === email
    );

    if (userExists) {
        return res.status(400).json({ message: 'User already exists!' });
    }

    // Save the user
    users.push({ username, email, password });
    res.status(201).json({ message: 'Registration successful!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
