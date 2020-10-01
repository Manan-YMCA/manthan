//Import All Required Node Modules with the help of predefined function that is require()
let express = require('express')
let bodyParser = require('body-parser')
let request = require('request')
let ejs =require("ejs");


//Initialize the express app
let app = express()

//View engine setup
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
routes=require('./routes');
let db=require('./db');

//Setting up port
app.set('port', (process.env.PORT || 5000))

//Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

//Process application/json
app.use(bodyParser.json())

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}
//Index route
app.get('/', routes)
app.post('/addUser', db.addUser)
app.get('/admin/:pin',db.admin)
app.get('/testEmail',db.testEmail)
app.get('/*', routes)
//Spin up the server
app.listen(app.get('port'), function() {
    console.log('App running on port', app.get('port'))
})
