var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')

var indexRouter = require('./routes/ind     ex');
var usersRouter = require('./routes/users');
var eventRouter = require('./routes/events');
var venueRouter = require('./routes/venue');
var decorationRouter = require('./routes/decoration');
var refreshMentRouter = require('./routes/refreshMent');
var starterRouter = require('./routes/starter');
var desertRouter = require('./routes/desert');
var maincourseRouter = require('./routes/maincourse');
var forgetPasswordRouter = require('./routes/forgetPassword');
var contactUsRouter = require('./routes/contactUs');
var eventDetailRouter = require('./routes/userEventDetail');
var userRefrehMentRouter = require('./routes/userRefrehment');
var userStarterRouter = require('./routes/userStarter');
var userDessertRouter = require('./routes/userDessert');
var userDishRouter = require('./routes/userDish');
var stripe = require('./routes/Stripe');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use('/public',express.static('./public'));

/*   ** Routes *** */
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/event',eventRouter);
app.use('/venue',venueRouter);
app.use('/decoration',decorationRouter);
app.use('/refreshMent',refreshMentRouter);
app.use('/starter',starterRouter);
app.use('/dessert',desertRouter);
app.use('/maincourse',maincourseRouter);
app.use('/forgetPassword',forgetPasswordRouter);
app.use('/contactUs',contactUsRouter);
app.use('/eventDetails',eventDetailRouter);
app.use('/userRefrehMent',userRefrehMentRouter);
app.use('/userStarter',userStarterRouter);
app.use('/userDessert',userDessertRouter);
app.use('/userDish',userDishRouter);
app.use('/stripe',stripe);


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
