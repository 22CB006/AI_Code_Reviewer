require('dotenv').config(); // Load environment variables first
const express = require("express");
const aiRoutes = require('./src/routes/ai.routes');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json({ limit: '1mb' })); // Limit payload size
app.use(express.urlencoded({ extended: true, limit: '1mb' }));
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("AI Code Reviewer API is running");
});

app.use('/ai', aiRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

module.exports = app;