const db_url = require('./config.js');

const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(db_url,{
            dbName: 'e-commerce',   
        });
        console.log("Successfully connected to ecommerce db on cloud");
    } catch(err){
        console.error(err);
    }
}

module.exports = connectDB;