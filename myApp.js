const mySecret = process.env['MESSAGE_STYLE']
require('dotenv').config()
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

//console.log("Hello World");

const myLogger = function(req, res, next) {
    console.log(req.method + " " + req.path + " - " + req.ip);
    next();
}

app.use(myLogger);

app.get("/", (req, res) => {
    res.sendFile(__dirname + '/views/index.html');
});


app.use("/public", express.static(__dirname + "/public"));

app.get("/json", (req, res) => {
    var message = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        message = message.toUpperCase();
    }
    res.json({"message": message});
});

app.get("/now", function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time});
});

app.get("/:word/echo", (req, res) => {
    res.json({echo: req.params.word});
})

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(urlencodedParser);

app.route('/name')
    .get((req, res) => {
        const {first, last} = req.query;
        const fullName = `${first} ${last}`;
        res.json({name: fullName});
    })
    .post((req, res) => {
        const {first, last} = req.body;
        const fullName = `${first} ${last}`;
        res.json({name: fullName});
    });













 module.exports = app;
