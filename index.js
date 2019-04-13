const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cookieparser = require('cookie-parser');
const authRoute = require('./routes/userauth');
const datesRoute = require('./routes/dates');

//https://stackoverflow.com/questions/18310394/no-access-control-allow-origin-node-apache-port-issue
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://serverforstuff-adrfigu966.c9users.io:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


//Express middleware

const port = process.env.PORT;
app.use('/', authRoute);
app.use('/', datesRoute);
app.use(express.static(__dirname +'/files'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cookieparser());

let mongoose = require('mongoose');
mongoose.connect(
    'mongodb+srv://adrfig96:' + process.env.DBPW + '@captain-h8f64.mongodb.net/budgetapp?retryWrites=true').then(()=>{
    }).catch(err=>{
        console.log(err);
});

app.get('/', function(req, res) {
    res.send("Hello!");
});

app.get('/logout', function(req, res) {
    res.cookie('token','').send("loggedout");
});

app.listen(port);