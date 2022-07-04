const express = require('express'); //express is a function that return a object
const path = require('path');
const exphbs = require('express-handlebars');
const methodOverride = require('method-override');
const session = require('express-session');
//const { request } = require('https');
const flash = require('connect-flash');
const passport = require('passport'); //when using passport, it shoult be done after use session

//Initializations
const app = express();
require('./database');
require('./config/passport');

//Settings
app.set('port', process.env.PORT || 3000); //something port in de pc or port 3000
app.set('views', path.join(__dirname, 'views')); //because the views not found in the directory scr
app.engine('.hbs', exphbs.engine({
    defaultLayoud: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'), // 'views/layouts/'
    partialsDir: path.join(app.get('views'), 'partials'), // 'views/partials/'
    extname: '.hbs'
})); //define a view engine for .hbs

app.set('view engine', '.hbs');

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'mysecretapp',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

//Global Variables
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');  //error is the default name for the flash message on passport
    res.locals.user = req.user || null;
    next(); //so it does not get stuck because Node is sigle thread
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname, 'public')));

//Server is listenning
app.listen(app.get('port'), () => {
    console.log('Listening on port', app.get('port'));
});
