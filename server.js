const express = require('express');
const path = require('path');
const app = express();
const pug = require('pug');

//Load View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//load static files
app.use(express.static('views'));

//Weather Route
app.get('/weather', (req, res) => {
	res.render('index');
});

app.listen(8880, () => {
	console.log('Server Running');
});
