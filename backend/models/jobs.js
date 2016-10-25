/**
 * Created by nuaimat on 10/24/16.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var jobsSchema = new Schema({
    title:  String,
    employer: String,
    location:   [Number, Number],
    active: {type: Boolean, index: true},
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now },
    employees: [{ name: String, assigned: Date }],
    selected_employee: String,
    category: {type: String, index: true}
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
