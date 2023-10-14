// Import the necessary modules and libraries
// Load environment variables from a .env file
require('dotenv').config();   

// Express.js framework 
const express = require('express'); 

// Node.js module for working with file paths
const path = require('path'); 

// Middleware for parsing request bodies
const bodyParser = require('body-parser'); 
const app = express(); // Create an Express app instance

 // import custom router
const router = require('./routes/server');

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Set the directory for views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

// connect to the MongoDB database
const { connectMonggose } = require('./config/database');
connectMonggose();

// Define a path for serving static assets (CSS, JavaScript, etc.)
const publicPath = path.join(__dirname, 'assets');
app.use(express.static(publicPath));

// Parse URL-encoded request bodies with extended support
app.use(bodyParser.urlencoded({ extended: true }));

// Parse JSON request bodies
app.use(express.json());

// Use the custom router for handling routes
app.use(router);

// Define the port for the server to listen 
const PORT = process.env.PORT || 8000;

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
