const mySecret = process.env['MESSAGE_STYLE']
require('dotenv').config()
let express = require('express');
let app = express();

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

app.get("/:word/echo", (req, res) {
    res.json({echo: req.params.word});
})















 module.exports = app;
