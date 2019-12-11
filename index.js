const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.get('/', function (req, res, next) {
    const query = req.query;
    res.status(200).json({ code: "success" });
});

const port  =process.env.PORT || 3000
app.listen(port, function(){
    console.log("listening on ", port);
});
app.on('error', console.error);
app.on('listening', console.log);
