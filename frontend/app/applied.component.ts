import {Component} from '@angular/core';
import {JobsService} from './jobs.service';
import {JobPost} from "./job-post";

@Component({
    selector: 'applied-component',
    templateUrl: 'views/applied-component.html',
    providers: [JobsService]
})
export class AppliedComponent {

    constructor(private jobService: JobsService) {
    }

    jobsList: JobPost[] = [
        {
            id: 1,
            title: 'Some title',
            category: 'Some category',
            description: 'The description',
            startingDate: new Date(),
            endingDate: new Date(),
            lat: 1,
            lng: 1
        }
    ];

    onTest() {

        var prom = this.jobService.getList();

        console.log(prom);

        return false;
    }

}