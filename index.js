const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

const templates = {

};

app.get('/', function (req, res, next) {
    const query = req.query;
    res.status(200).json({ code: "success" });
});

app.post('/adroit/template/:name', function (req, res, next) {
    templates[req.param.name] = req.body;
    res.status(200).json({ code: "success" });
})

app.get('/adroit/template/:name', function (req, res, next) {
    res.status(200).json(templates[req.param.name] || {});
})



const port = process.env.PORT || 3000
app.listen(port, function () {
    console.log("listening on ", port);
});
app.on('error', console.error);
app.on('listening', console.log);
