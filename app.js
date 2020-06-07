var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mustacheExpress = require('mustache-express')
var mongoose = require('mongoose')
var cors = require('cors')

mongoose.connect('mongodb://localhost:27017/cashapp',{
  useNewUrlParser: true,
  useUnifiedTopology:true,
  useFindAndModify:false
})
.then(()=> console.log("db ready to use"))
.catch( err => console.log(err))

var indexRouter = require('./routes/index');
var itemsRouter = require('./routes/items');
var stocksRouter = require('./routes/stocks')
var receiptsRouter = require('./routes/receipts')
var storeRouter = require('./routes/store')

var indexAPI = require('./routes/api/index')


var app = express();


// view engine setup
app.engine('html',mustacheExpress())
app.set('view engine', 'html')
app.set('views', path.join(__dirname,'/views'));

app.use(cors())
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
app.use('/store',storeRouter)
app.use('/api', indexAPI)

app.use('/js',express.static(__dirname+'/node_modules/bootstrap/dist/js'))
app.use('/js',express.static(__dirname+'/node_modules/jquery/dist/'))
app.use('/css',express.static(__dirname+'/node_modules/bootstrap/dist/css'))

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
