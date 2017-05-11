const express = require("express");
const ejs = require('ejs');
const mongoose = require('mongoose');
const serveStatic = require('serve-static');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const logger = require('morgan');
const config = require('./config/config.js');
const port = process.env.PORT || 3030;
const app = express();


mongoose.connect(config.connectionstring);

app.set('views','./public/html');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(session({
    secret: 'sweetBook',
    store: new mongoStore({
        url: config.connectionstring,
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));

//打印控制台日志
if ('development' === app.get('env')) {
    app.set('showStackErro', true);
    // app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}

require('./config/routes')(app);

app.listen(port);
app.use(serveStatic('public'));
console.log('sweetBook is start in port ' + port);

