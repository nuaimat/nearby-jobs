var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var jobs = require('./routes/jobs');
var frontend = require('./routes/frontend');

var mongoose = require('mongoose');
var Promise = require('promise');
var session = require('express-session');

var app = express();

var config = require('./config_' + app.get('env') + ".json");
app.use((req, res, next) => {
  res.locals.config = config;
  next();
});





var db_auth = `${config.db_username}:${config.db_password}@`;
if(config.db_username == "" ){
    db_auth = "";
}

var mongoose_options = { promiseLibrary: Promise };
var dbConnectionString = `mongodb://${db_auth}${config.db_hostname}:${config.db_port}/${config.db_name}`;
console.log("dbConnectionString: " + dbConnectionString);
mongoose.connect(dbConnectionString, mongoose_options);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  /*
  var Job = require('./models/jobs');
  var newJob = new Job({
    title:  "Sample Job",
    employer: "Mr. Robot",
    location:   [-91.96160137653351, 41.005961558865245],
    active: true,
    employees: [],
   job_categories: "computer networks"
  });

  newJob.save((err) => {
    if (err) {
      var errMessage = '';

      // go through all the errors...
      for (var errName in err.errors) {
        console.log(err.errors[errName]);
      }
      throw err;
    }
    console.log("Job Saved Successfully: ");
  }); */

  // we're connected!
  app.listen(8080);
  console.log("Listening on port 8080");
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: '321A4-4D44-WqxEq38',
  resave: true,
  saveUninitialized: true
}));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// TODO Remove later, used to always login user even when node restarts due to file changes (nodemon)
app.use((req, res, next) => {
  req.session.user = "admin";
  next();
});

app.use(require('less-middleware')(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));




app.use('/', routes);
app.use('/users', users);
app.use('/jobs', jobs);
app.use('/frontend', frontend);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
