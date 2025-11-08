const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
var database = require("./database/database");
const cors = require('cors');
const cookieParser = require('cookie-parser');
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

const allowedOrigins = ['https://www.oramsysdev.com', 'https://oramsysdev.com', 'http://localhost:3000', 'http://localhost:5173', 'https://oramsysdev.netlify.app', "https://oramsys3.netlify.app"]

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);
// app.use(cors(corsOptions));
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());  // This enables req.cookies
app.use(express.static('files'));





function setupRoutes() {
    const routes = require("./routes/index")
    routes.setup(app)
}

setupRoutes()

app.listen(port, () => {
    console.log(`Server is running on PORT ${port}`);
});