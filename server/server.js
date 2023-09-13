const express = require('express');
const bodyParser = require('body-parser');
const db = require('./database');

const app = express();
const PORT = 5000;

// This helps in parsing POST request body
app.use(bodyParser.json());

// CORS setup (Allowing frontend to communicate with this server)
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.post('/submit-email', async (req, res) => {
    const email = req.body.email;
    
    try {
      const result = await db.query('INSERT INTO subscribers(email) VALUES($1) RETURNING *', [email]);
      console.log('Email stored:', result.rows[0]);
      res.json({ message: 'Email received!' });
    } catch (error) {
      console.error('Error saving email:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
