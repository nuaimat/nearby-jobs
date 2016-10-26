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

// tasks i applied to
router.get('/my',auth, function(req, res) {
    let userid = req.session.user;
    Job.find(
            {active: true, applicants: userid, assigned: null, start_datetime: {$gt: new Date() } },
            {__v: false, applicants: false}
        )
        .sort({start_datetime: -1})
        .limit(100)
        .exec(function(err, jobs) {
            if (err) throw err;
            //console.log(jobs);
            //let assigned = jobs.filter((j) => j.assigned_to == userid);
            //let pending = jobs.filter((j) => j.assigned_to == "" ||  j.assigned_to == null);
            if(jobs.length > 0) {
                res.status(200).json({data: jobs, count: (jobs.length)});
            } else {
                res.status(200).json({data: {}, count: 0});
            }
        });

});


// jobs i posted
router.get('/my/posted',auth, function(req, res) {
    let userid = req.session.user;
    Job.find(
            {active: true, employer: userid, assigned: null, start_datetime: {$gt: new Date() } },
            {__v: false}
        )
        .sort({start_datetime: -1})
        .limit(100)
        .exec(function(err, jobs) {
            if (err) throw err;
            //console.log(jobs);
            //let assigned = jobs.filter((j) => j.assigned_to == userid);
            //let pending = jobs.filter((j) => j.assigned_to == "" ||  j.assigned_to == null);
            if(jobs.length > 0) {
                res.status(200).json({data: jobs, count: (jobs.length)});
            } else {
                res.status(200).json({data: {}, count: 0});
            }
        });

});


router.put('/assign/:id/:emp',auth,function(req, res) {
    
    let id = req.params.id;
    let emp = req.params.emp;
    let userid = req.session.user;
    // get sure this job belongs to me
    console.log(`applying for job _id: ${id} for: ${userid}`);
    Job.findOneAndUpdate({_id: id, employer: userid},  {assigned_to: emp} , function(err,job) {
        if (err) throw err;
        res.status(201).json({data: {"id": req.params.id}});
    });
});
// add new job
router.post('/',auth,function(req, res) {
    console.log(req.body);
    let userid = req.session.user;
    let newJob = new Job({
        title:  req.body.title,
        description: req.body.description,
        location:   [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        active: true,
        applicants: [],
        category: req.body.category,
        employer: userid,
        start_datetime: req.body.startingDate,
        end_datetime: req.body.endingDate
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

// remove job applicantion
router.delete('/unapply/:id/',auth,function(req, res) {
    let id = req.params.id;
    let userid = req.session.user;
    console.log("unapplying at id : " + id  + ' for user ' + userid);
    Job.findOneAndUpdate({_id: id},  {$pull: {applicants: userid}} , {upsert: true}, function(err,job) {
        if (err) {console.log(err); throw err;}
        res.status(201).json({data: {"id": req.params.id}});
    });
});


// de activate a job
/* router.put('/:id',auth,function(req, res) {
    let id = req.params.id;
    Job.findOneAndUpdate({id: id}, {active: false}, function(err,job) {
        if (err) throw err;
        res.status(201).json({data: {"id": req.params.id}});
    });
}); */


// update add to applicants
router.put('/apply/:id',auth,function(req, res) {
    
    let id = req.params.id;
    let userid = req.session.user;
    console.log(`applying for job _id: ${id} for: ${userid}`);
    Job.findOneAndUpdate({_id: id},  {$addToSet: {applicants: userid}} , {upsert:true}, function(err,job) {
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
        applicants: [],
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
