const mongoose = require('mongoose');
const color = require('colors');


const connectDB = async () => {1
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB ${mongoose.connection.host}'.bgGreen.white);
    }catch (error){
        console.error('Error connecting to MongoDB: ${error}'.bgRed.white);
    }

}

module.exports = connectDB;