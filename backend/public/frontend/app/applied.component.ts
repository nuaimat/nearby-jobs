import {Component, OnInit} from '@angular/core';
import {JobsService} from './jobs.service';
import {JobPost} from "./job-post";
import {Job} from "./job";
import {LatLon} from "./LatLon";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";

@Component({
    selector: 'applied-component',
    templateUrl: 'views/applied-component.html',
    providers: [JobsService]
})
export class AppliedComponent implements OnInit {

    constructor(private jobService: JobsService) {
    }

    appliedJobs: Observable<Job[]>;

    ngOnInit(): void {
        var self = this;
        this.appliedJobs = self.jobService.getMyAppliedJobs()
            .catch(error=>{
                console.log(error);
                return Observable.of<Job[]>([]);
            })
    }

    getJobStatus(j:Job): string{
        let status = "pending";
        if(j.assigned_to == null){
            status = "pending";
        } else { // the api won't return jobs assigned to others
            status = "Assigned to me";
        }
        return status;
    }

    cancelledIds : string[] = [];
    cancelJobApplication(id:string): void {
        this.jobService.cancelJobApplication(id);
        this.cancelledIds.push(id);
    }
}