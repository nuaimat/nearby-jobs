var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/login', function (req, res) {
  if (!req.body.username || !req.body.password) {
        res.send('login failed');
  } else { // should match against DB here but whatever
    console.log("login request for " + req.body.username);
    req.session.user = req.body.username;
    res.redirect('/?msg=Login+success!');
  }
});

// Logout endpoint
router.get('/logout', function (req, res) {
  console.log("logout request");
  req.session.destroy();
  res.redirect('/?msg=Logout+success!');
});

module.exports = router;
