var express = require('express');
var router = express.Router();

/* GET add point of interest page. */
router.get('/', function(req, res, next) {
    console.log(res.locals.config.poi_categories);
    res.render('frontend', { title: 'Points of interest', job_categories: res.locals.config.job_categories });
});

module.exports = router;
