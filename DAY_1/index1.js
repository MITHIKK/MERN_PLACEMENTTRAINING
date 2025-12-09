const express = require('express');
const app = express();
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users/:userId', (req, res) => {
    const userId = req.params.userId;
    res.send(`User ID: ${userId}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

//http://localhost:3001/users/123