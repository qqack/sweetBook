var express = require("express");
var ejs = require('ejs');
var mongoose = require('mongoose');
var serveStatic = require('serve-static');
var session = require('express-session');
var mongoStore = require('connect-mongo')(session);
var logger = require('morgan');
var port = process.env.PORT || 3030;
var app = express();


mongoose.connect('mongodb://localhost:27017/sweetBook');

app.set('views','./public/html');
app.engine('.html', ejs.__express);
app.set('view engine', 'html');
app.use(require('body-parser').urlencoded({extended: true}));
app.use(session({
    secret: 'sweetBook',
    store: new mongoStore({
        url: 'mongodb://localhost:27017/sweetBook',
        collection: 'sessions'
    }),
    resave: false,
    saveUninitialized: true
}));
//打印控制台日志
if ('development' === app.get('env')) {
    app.set('showStackErro', true);
    app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}


require('./config/routes')(app);

app.listen(port);
app.use(serveStatic('public'));
console.log('sweetBook is start in port ' + port);

