const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');

require('dotenv').config();

require('./utils/auth')(passport);


const THIRTY_MINUTS = 30 * 60 * 1000;

//IMPORT: ROUTE
const routeUsers = require('./route/routeUser');
const routeLogin = require('./route/routeLogin');
const routeLead = require('./route/routLead');
const routeRoles = require('./route/routeRoles');
const routeSettings = require('./route/routeSettings');
const routeMercadoPago = require('./route/routMercadoPago');
const routeExtracts = require('./route/routeExtract');
const routeProfessional = require('./route/routProfessional');
const routeNotification = require('./route/routNotifications');



var globalDir = __dirname;
exports.globalDir = globalDir;

//TODO: DEFAULT CONFIGURATIONS CORS, JSON RESPONSE, 404 WRONG PAGE
app.use(cors());

app.use((req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Credentials', true);
    res.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS, UPDATE');
    res.set('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-type, Accept');

    next();
});

app.use(passport.initialize());

app.use(session({
    secret: process.env.SECRET_TOKEN,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: THIRTY_MINUTS }
}));

app.use(passport.session());

//JSON RESPONSE
app.use(express.json());

app.use(
    routeUsers,
    routeLogin,
    routeLead,
    routeRoles,
    routeSettings,
    routeMercadoPago,
    routeExtracts,
    routeProfessional,
    routeNotification
);

app.use('*', (req, res) => {
    res.sendFile(path.join(`${__dirname}/pages/404.html`));
});

module.exports = app;