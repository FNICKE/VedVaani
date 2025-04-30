const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const color = require('colors');
const dotenev = require('dotenv');
const connectDB = require('./config/db');




dotenev.config()

// Connect to MongoDB
connectDB();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));

const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
    console.log('Server Running in ${process.env.DEV_MODE} mode on port ${PORT}'.green.bold);
    });