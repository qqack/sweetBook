let express = require("express");
let ejs = require('ejs');
let mongoose = require('mongoose');
let serveStatic = require('serve-static');
let session = require('express-session');
let mongoStore = require('connect-mongo')(session);
let logger = require('morgan');
let port = process.env.PORT || 3030;
let app = express();


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
    // app.use(logger(':method :url :status'));
    app.locals.pretty = true;
    mongoose.set('debug',true);
}

require('./config/routes')(app);

app.listen(port);
app.use(serveStatic('public'));
console.log('sweetBook is start in port ' + port);

