var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let loggedIn =  req.session && req.session.user ? req.session.user : false;
  console.log(loggedIn);
  console.log(req.session);
  res.render('index', { title: 'Local Job Posting', loggedIn: loggedIn });
});

module.exports = router;
