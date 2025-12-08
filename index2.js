const express = require('express');
const app = express();
const port = 3002;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users/:userId/profile', (req, res) => {
    const userId = req.params.userId;
    const name = req.query.name;
    const age = req.query.age;
    res.send(`User ID: ${userId}, Name: ${name}, Age: ${age}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//http://localhost:3002/users/123/profile?name=mk&age=20