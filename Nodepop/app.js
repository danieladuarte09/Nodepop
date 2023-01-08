var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const authMiddelware = require('./lib/authMiddleware')

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//CONECTO MI BASE DE DATOS DE LOS ANUNCIOS
require('./lib/connectMongoose');
require('./routes/api/anuncios')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/**
 * RUTAS DE MI API
 */
//authMiddelware,
app.use('/api/anuncios',  require('./routes/api/anuncios'));

/**
 * RUTAS DE MI WEBSITE
 */

app.use('/', function(req, res, next){
  console.log('recibo una petición');
  next();
})

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  res.status(err.status || 500);

  //si es una petición al Api, responder con formato JSON
  if (req.originalUrl.startsWith('/api/')){
    res.json({ error:err.message});
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  
  res.render('error');
});

module.exports = app;
