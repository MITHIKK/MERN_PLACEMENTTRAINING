const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('./db.js');
require('dotenv').config();
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const userSchema = new mongoose.Schema({
    username: {type: String, required: true
    },
    email: {type: String, required: true},
    age: {type :  Number , required: true}
});

const User = mongoose.model('User', userSchema);

const newUser = new User({
    username: 'john_doe',
    email: 'john@example.com',
    age: 30
});

newUser.save().then( ()=>{
    console.log('New user saved to the database');
}).catch((err)=>{
    console.error('Error saving user:', err);
});
app.get('/users/:userId/profile', (req, res) => {
    const userId = req.params.userId;
    const name = req.query.name;
    const age = req.query.age;
    res.send(`User ID: ${userId}, Name: ${name}, Age: ${age}`);
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});

