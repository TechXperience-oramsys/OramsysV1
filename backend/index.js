const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
var database = require("./database/database");
const cors = require('cors');
const port = process.env.PORT || 5002


// Cross-domain JavaScript Source File Inclusion
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://trusted-cdn.com");
    next();
});

// X-Content-Type-Options Header Missing
app.use((req, res, next) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    next();
});

// Server Leaks Version Information via "Server" HTTP Response Header Field
app.disable('x-powered-by'); // Disables "X-Powered-By" header (Express-specific)

app.use((req, res, next) => {
    res.removeHeader("Server"); // Completely removes the "Server" header
    next();
});

// Strict-Transport-Security Header Not Set
app.use((req, res, next) => {
    res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
    next();
});

// Missing Anti-Clickjacking Header
app.use((req, res, next) => {
    res.setHeader("X-Frame-Options", "DENY"); // Prevent clickjacking
    next();
});

// Content Security Policy (CSP) Header Not Set
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self'; img-src 'self';");
    next();
});

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.static('files'))

app.all("*", function (req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Origin", 
        "*" // Replace '*' with your frontend domain in production
    );
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader(
        "Content-Security-Policy",
        "default-src 'self'; frame-src 'self' data:; script-src 'self';"
      );
      
    res.setHeader(
        "Access-Control-Allow-Headers", 
        "X-Requested-With, Content-Type, Authorization, Accept"
    );
    res.setHeader(
        "Access-Control-Allow-Methods", 
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    next();
});

function setupRoutes() {
    const routes = require("./routes/index")
    routes.setup(app)
}

setupRoutes()

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});