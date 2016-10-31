import {Component, OnInit} from '@angular/core';
import {JobsService} from './jobs.service';
import {JobPost} from "./job-post";
import {Job} from "./job";
import {LatLon} from "./LatLon";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import { LoginService } from './login.service';
import {Router} from '@angular/router'



@Component({
    selector: 'applied-component',
    templateUrl: 'views/applied-component.html',
    providers: [JobsService]
})
export class AppliedComponent implements OnInit {

    constructor(private jobService: JobsService, private loginService: LoginService, private router: Router) {
    }

    appliedJobs: Observable<Job[]>;
    postedJobs: Observable<Job[]>;

    private refreshDataSources  (): void {
        var self = this;
        this.appliedJobs = self.jobService.getMyAppliedJobs()
            .catch(error=>{
                console.log(error);
                return Observable.of<Job[]>([]);
            });
        this.postedJobs = self.jobService.getMyPostedJobs()
            .catch(error=>{
                console.log(error);
                return Observable.of<Job[]>([]);
            });
    }
    ngOnInit(): void {
        var self = this;

        if( !this.loginService.isLoggedIn() ) {
            this.router.navigate(['/login']);
            return;
        }

        this.refreshDataSources();            
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
        this.jobService.cancelJobApplication(id)
            .toPromise()
            .then(() => {
                    this.cancelledIds.push(id);
                    this.refreshDataSources();
            });
        
    }

    assignJobApplication(id: string, employee: string): void {
        if(employee=="Unassigned"){
            employee = null;
        }
        console.log("assigning to employee : " + employee + " id: " + id);
        this.jobService.assignJobApplication(id, employee)
            .toPromise().then( () => {
                this.refreshDataSources();
            }
            );
        
    }
}