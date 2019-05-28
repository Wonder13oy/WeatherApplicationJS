const express = require('express');
const app = express();
const pug = require('pug');

app.set('view engine', 'pug');

app.get('/weather', (req, res) => {
    res.render('index');
})

app.listen(8880, () => {
    console.log('Server Running');
})