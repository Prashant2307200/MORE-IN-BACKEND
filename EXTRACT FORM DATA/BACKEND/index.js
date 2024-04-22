const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../FRONTEND/index.html'));
})

app.get('/register', (req, res) => {
    const { user,password } = req.query;
    res.send(`Standard GET request ,Hi ${ user }`)
})

app.post('/register', (req, res) => {
    const { user,password } = req.body;
    res.send(`Standard POST request ,Hi ${ password }`);
});

app.listen(port,() => {
    console.log(`listening on ${port}`);
});