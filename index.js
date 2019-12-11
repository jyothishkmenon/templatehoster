const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res, next) {
    const query = req.query;
    res.status(200).send(JSON.stringify({ code: "success" }));
});
