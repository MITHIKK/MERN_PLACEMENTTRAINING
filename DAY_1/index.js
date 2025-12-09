const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.put('/users', (req, res) => {
    res.send('PUT request to the users');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
