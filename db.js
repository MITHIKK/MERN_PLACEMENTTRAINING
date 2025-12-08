const express = require('express');
const mongoose = require('mongoose');

const uri= 'mongodb+srv://mk:MK@cluster0.hixukzj.mongodb.net/'

mongoose.connect(uri)

const connection = mongoose.connection;

connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})