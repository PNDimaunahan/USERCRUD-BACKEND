const mongoose = require('mongoose');

const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Mongo Connected');
    } catch (error){
        console.log('Mongo Connection Failed: ', error.message);
    }
};

module.exports = { connectDB, mongoose};