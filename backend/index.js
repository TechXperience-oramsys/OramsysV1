const express = require('express');
const app = express();
const dotenv = require('dotenv').config();
var database = require("./database/database");
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const port = process.env.PORT || 5002

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: "Too many requests from this IP, please try again after 15 minutes"
});

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.static('files'))

// Apply rate limiting to all auth routes
app.use('/auth', authLimiter);

app.all("*", function (req, res, next) {
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type,Authorization ,Accept"
    );
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE"
    );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "X-Requested-With,content-type, Authorization"
    );
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
