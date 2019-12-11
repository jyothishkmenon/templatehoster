const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const templates = {};

app.get('/test', function (req, res, next) {
    const query = req.query;
    res.status(200).json({code: "success"});
});

app.post('/adroit/template/:name', function (req, res, next) {
    templates[req.params.name] = req.body;
    res.status(200).json({code: "success"});
});

app.get('/adroit/template/:name', function (req, res, next) {
    res.status(200).json(templates[req.params.name] || {});
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening on ", port);
});
app.on('error', console.error);
app.on('listening', console.log);
