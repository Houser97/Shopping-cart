var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user')
const bcryptjs = require('bcryptjs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const apiRouter = require('./routes/api');

var app = express();

const origin = process.NODE_ENV !== 'production' ? "http://localhost:3000" : "https://houser97.github.io/Shopping-cart/"

require('dotenv').config();
const cors = require('cors');
app.use(  cors({
  origin,
  credentials: true,
}))


const MongoDB = `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.cjswbgn.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`
mongoose.connect(MongoDB, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind((console, 'MongoDB connection error: ')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

passport.use(
  new LocalStrategy({usernameField: 'email'},(email, password, done) => {
    User.findOne({email}, (err, user) => {
      if(err) return done(err);
      if(!user) return done(null, false, {message:'Incorrect username'});
      bcryptjs.compare(password, user.password, (err, res) => {
        if(res) return done(null, user);
        else return done(null, false, {message: 'Incorrect password'});
      })
    })
  })
)

//Creación de Cookie para mantener usuario en sesión.
passport.serializeUser((user, done) => {
  done(null, user.id);
})

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user)
  })
})

//PASSPORT
app.use(session(
  {
    secret:'cats', 
    resave: false, 
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 * 7 } // Opciones de la cookie
  }
));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({extended: false}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', apiRouter);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
