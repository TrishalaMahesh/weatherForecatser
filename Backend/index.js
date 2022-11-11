//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
//var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
const todayRoutes = require('./Routes/today');
const dotenv = require('dotenv');
dotenv.config();
const hourlyRoutes = require('./Routes/hourly');
const weeklyRoutes = require('./Routes/weekly');
const weekendRoutes = require('./Routes/weekend');
const monthlyRoutes = require('./Routes/monthly');
const frontEndURL = "http://localhost:3000";

//use cors to allow cross origin resource sharing
app.use(cors({ origin: frontEndURL, credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe280_weatherforecaster',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', frontEndURL);
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

app.use(todayRoutes);
app.use(hourlyRoutes);
app.use(weeklyRoutes);
app.use(weekendRoutes);
app.use(monthlyRoutes);

  
//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");