var express = require('express')
var app = express()
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index')
})
app.get('/*', function (req, res) {
    res.send("<h1>404 | Page Not Found<\/h1><br/>-WebTeam | Manan")
})

module.exports = app;