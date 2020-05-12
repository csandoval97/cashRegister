var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mustacheExpress = require('mustache-express')
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test',{
  useNewUrlParser: true,
  useUnifiedTopology:true
})
.then(
  ()=> console.log("db ready to use"),
  err => console.log("err connecting to database")
)

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var stocksRouter = require('./routes/stocks')
var receiptsRouter = require('./routes/receipts')

var app = express();

// view engine setup
app.engine('html',mustacheExpress())
app.set('view engine', 'html')
app.set('views', path.join(__dirname,'/views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);
app.use('/', indexRouter)
app.use('/items', itemsRouter)
app.use('/stocks',stocksRouter)
app.use('/receipts',receiptsRouter)

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
