const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const color = require('colors');
const dotenev = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middlewares/errorMiddleware');

//Routes Path
const authRoutes = require('./routes/authRoutes');




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
app.use(errorHandler);

// Routes
app.post('/api/v1/auth/register', (req, res) => {
    const { username, email, password } = req.body;
    res.json({ username, email, password });
  });
const PORT = process.env.PORT || 3000;



app.listen(PORT, () => {
    console.log('Server Running in ${process.env.DEV_MODE} mode on port ${PORT}'.green.bold);
    });

    