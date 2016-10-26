var express = require('express');
var router = express.Router();
var Job = require('../models/jobs');
var auth = require('../models/auth');


// list last 1000
router.get('/', function(req, res) {
    //addSample();

    Job.find({active: true},{_id: false, __v: false})
        .sort({updated: -1})
        .limit(1000)
        .exec(function(err, jobs) {
            if (err) throw err;
            //console.log(jobs);
            res.status(200).json({data: jobs});
        });


});

// my tasks
router.get('/my',auth, function(req, res) {
    let userid = req.session.user;
    Job.find({active: true, employees: userid, assigned: null},{_id: false, __v: false, employees: false})
        .sort({start_time: -1})
        .limit(100)
        .exec(function(err, jobs) {
            if (err) throw err;
            //console.log(jobs);
            let assigned = jobs.filter((j) => j.assigned_to == userid);
            let pending = jobs.filter((j) => j.assigned_to == "" ||  j.assigned_to == null);
            if(assigned.length > 0 || pending.length > 0) {
                res.status(200).json({data: {assigned: assigned, pending: pending}, count: (assigned.length+pending.length)});
            } else {
                res.status(200).json({data: {assigned: assigned, pending: pending}, count: 0});
            }
        });

});

// add new job
router.post('/',auth,function(req, res) {
    console.log(req.body);
    let newJob = new Job({
        title:  req.body.title,
        employer: "Mr. Robot",
        location:   [parseFloat(req.body.lon), parseFloat(req.body.lat)],
        active: true,
        employees: [],
        category: req.body.category
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
        res.status(201).json({data: {"id": newJob._id}});
    });

});


// get 10 listings around a specific area
//url: jobs/around?lat=41.0060455&lon=-91.9610144&category=*
router.get('/around', function(req, res) {
    let currentLocation = [parseFloat(req.query.lon), parseFloat(req.query.lat)];
    if(isNaN(currentLocation[0]) || isNaN(currentLocation[1])){
        throw "Wrong coords";
    }
    console.log("currentLocation: " + currentLocation);

    Job.find({active: true},{__v: false})
        .where('location').near({ center: currentLocation})
        .sort({location: -1, updated: -1})
        .limit(10)
        .exec(function(err, jobs) {
            if (err) throw err;

            //console.log(jobs);
            res.status(200).json({data: jobs});
        });


});

// delete a posting
router.delete('/:id/',auth,function(req, res) {
    let id = req.params.id;
    Job.findByIdAndRemove(id, function(err) {
        if (err) throw err;
        res.status(201).json({data: {"id": req.params.id}});
    });
});


// de activate a job
router.put('/:id',auth,function(req, res) {
    let id = req.params.id;
    Job.findOneAndUpdate({id: id}, {active: false}, function(err,job) {
        if (err) throw err;
        res.status(201).json({data: {"id": req.params.id}});
    });
});


// update add to employees
router.put('/:id/:userid',auth,function(req, res) {
    let id = req.params.id;
    let userid = req.session.user;

    Job.findOneAndUpdate({id: id},  {$addToSet: {employees: userid}} , {upsert:true}, function(err,job) {
        if (err) throw err;
        res.status(201).json({data: {"id": req.params.id}});
    });
});


var addSample = function(){
    var newJob = new Job({
        title:  "Sample Job",
        employer: "Mr. Robot",
        location:   [-91.96160137653351, 41.005961558865245],
        active: true,
        employees: [],
        category: "computer networks"
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
    });
};

module.exports = router;
