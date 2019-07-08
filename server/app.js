var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");
var indexRouter = require('./routes/index');
var app = express();

// declaration of the routes
var MedicalInfoRoute = require('./routes/MedicalInfoRoute');
var GetExerciseType = require('./routes/getExerciseTypeRoute');
var AdminRoute = require('./routes/AdminRoute');
var PhysicalInfoRoute = require('./routes/PhysicalInfoRoute');
var UserRoute = require('./routes/UserRoute');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

//routes
app.use('/MedicalInfo', MedicalInfoRoute);
app.use('/GetExerciseType',GetExerciseType);
app.use('/AdminRoute', AdminRoute);
app.use('/PhysicalInfo', PhysicalInfoRoute);
app.use('/User', UserRoute);
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
