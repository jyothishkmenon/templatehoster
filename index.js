const express = require('express');
const path = require('path');
const logger = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const lodash = require('lodash');
// const fs = require('fs');

const app = express();
app.use(cors());


app.use(bodyParser.json());
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended: false}));
// const mobFilesPath = path.join(__dirname, 'public', 'files', 'mobile');
// const webFilesPath = path.join(__dirname, 'public', 'files', 'web');
// if (!fs.existsSync(mobFilesPath)){
//     fs.mkdirSync(mobFilesPath);
// }
// if (!fs.existsSync(webFilesPath)){
//     fs.mkdirSync(webFilesPath);
// }


app.use(express.static(path.join(__dirname, 'public')));

const mobileTemplates = {};
const webTemplates = {};
const templates = {};

app.get('/test', function (req, res, next) {
    const query = req.query;
    res.status(200).json({code: "success"});
});

app.post('/adroit/template/:name', function (req, res, next) {
    const name = lodash.get(req.params, 'name', '').toLowerCase();
    templates[name] = req.body;
    res.status(200).json({code: "success"});
});

app.post('/adroit/templates/add', function (req, res, next) {
    const templateName = lodash.get(req.body, 'formName', req.query.name || '').toLowerCase();
    templates[templateName] = req.body;
    const mobtemplate = lodash.get(req.body, 'form.androidForm');
    const webtemplate = lodash.get(req.body, 'form.webForm');
    if (mobtemplate) {
        mobileTemplates[templateName]=mobtemplate;
        // fs.writeFileSync(path.join(mobFilesPath, templateName+'.json'), JSON.stringify(mobtemplate, null, 2));
    }
    if (webtemplate){
        webTemplates[templateName]=webtemplate;
        // fs.writeFileSync(path.join(webFilesPath, templateName+'.json'), JSON.stringify(webtemplate, null, 2));
    }
    res.status(200).json({code: "success"});
});

app.get('/adroit/template/mobile/:name', function (req, res, next) {
    const name = lodash.get(req.params, 'name',  '').toLowerCase();
    const result = lodash.get(mobileTemplates, name, lodash.get(templates, name, {}));
    res.status(200).json(result);

});
app.get('/adroit/template/web/:name', function (req, res, next) {
    const name = lodash.get(req.params, 'name', '').toLowerCase();
    const result = lodash.get(webTemplates, name, lodash.get(templates, name));
    res.status(200).json(result);

});

app.get('/adroit/template/:name', function (req, res, next) {
    const name = lodash.get(req.params, 'name', '').toLowerCase();
    res.status(200).json(templates[name] || {});
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
    console.log("listening on ", port);
});
app.on('error', console.error);
app.on('listening', console.log);
