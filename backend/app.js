// Import necessary modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { readdirSync } = require('fs');
const { db } = require("./db/db");

// Create an Express application
const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(express.json())
app.use(cors())

// Routes
readdirSync('./routes').map((route) => {
    const routePath = `./routes/${route}`
    const routeModule = require(routePath)
    app.use('/api/v1', routeModule)
})

// Define a simple default route
app.get('/', (req, res) => {
    res.send("Hello, world")
})

// Start the server
const server = () => {
    // Initialize the database
    db()
    app.listen(PORT, () => {
        console.log("Server listening on PORT", PORT);
    })
};

server();
