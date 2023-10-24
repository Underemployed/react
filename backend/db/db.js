const mongoose = require('mongoose');

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.MONGO_URL);
        console.log("DB Connected");
    } catch (error) {
        console.log("DB connection error\nError:", error, "---".repeat(100));
    }
};

module.exports = {db}; 
