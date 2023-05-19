const express = require('express');
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const PART = require('path');
const APP = express();
const PORT = 5000;
const route = require('./routes');
// kết nối với database
const DB = require('./config/db');
DB.connect();
APP.use(express.static(PART.join(__dirname, 'public')));
// HTTP logger
APP.use(morgan('combined'));

// Template engine
APP.engine('hbs', engine({ extname: '.hbs' }));
APP.set('view engine', 'hbs');
APP.set('views', PART.join(__dirname, 'resources', 'views'));
APP.use(express.urlencoded({ extended: true }));
APP.use(express.json());
// route init
route(APP);

APP.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
});
