/**
 * Created by nuaimat on 10/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobsSchema = new Schema({
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    title:  String,
    description:  String,
    category: {type: String, index: true},
    employer: String,
    location:   [Number, Number],
    active: {type: Boolean, index: true},
    applicants: [String],
    assigned_to: {type: String,  default: null},
    start_datetime: { type: Date},
    end_datetime: { type: Date},
});

jobsSchema.index({ location: "2d"});

/* jobsSchema.pre('save', function(next){
    let currentDate = new Date();
    this.updated = currentDate;
    if(!this.created) this.created = currentDate;
    next();
}); */

var Job = mongoose.model('job', jobsSchema);

module.exports = Job;
