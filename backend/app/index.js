const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const port = process.env.PORT || 5002;
const cookieParser = require('cookie-parser');
const connectDB = require("./database/database");
connectDB();

// Handle preflight requests early
app.options('*', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  return res.sendStatus(204);
});

const allowedOrigins = [
  'https://www.oramsysdev.com',
  'https://oramsysdev.com',
  'http://localhost:3000',
  'http://localhost:5173',
  'https://oramsysdev.netlify.app',
  'https://oramsys3.netlify.app'
];

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

app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());
app.use(express.static('files'));

// Security headers (keep these after CORS setup)
app.use((req, res, next) => {
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Content-Security-Policy", "default-src 'self'; script-src 'self' https://trusted-cdn.com; style-src 'self'; img-src 'self';");
  res.removeHeader("Server");
  next();
});

app.disable('x-powered-by');

function setupRoutes() {
  const routes = require("../routes/index");
  routes.setup(app);
}

setupRoutes();


module.exports = app; // for CommonJS

