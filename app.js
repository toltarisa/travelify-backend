var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const swaggerExpress = require('swagger-ui-express');
const swaggerOptions = require('./swagger.json');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const category = require('./routes/categoryRoutes');
const location = require('./routes/locationRoutes');
const photo = require('./routes/photoRoutes');
const comment = require('./routes');
const auth = require('./routes/authRoutes');
const request = require('./routes/requestRoutes');

var app = express();
require('./config/db')();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  '/api/docs',
  swaggerExpress.serve,
  swaggerExpress.setup(swaggerOptions),
);

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.use(auth);
app.use(request);
app.use('/categories', category);
app.use('/locations', location);
app.use('/locations', photo);
app.use('/locations', comment);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
