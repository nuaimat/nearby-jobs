import {Component} from '@angular/core';
import {JobPost} from './job-post';
import {JobsService} from './jobs.service';


@Component({
    selector: 'post-a-job-component',
    templateUrl: 'views/post-a-job-component.html',
    providers: [JobsService]
    //styleUrls: ['map.component.css'],
})
export class PostAJobComponent {

    constructor(private jobService: JobsService) {
    }

    theMarker: marker = {
        lat: 51.678418,
        lng: 7.809007,
        draggable: true
    };

    post = new JobPost();

    onSubmit() {

        var prom = this.jobService.getList();

        console.log(prom);

        return false;
    }

    onTest() {

        var prom = this.jobService.getList();

        console.log(prom);

        return false;
    }

    markerDragEnd($event): void {
        this.post.lat = $event.coords.lat;
        this.post.lng = $event.coords.lng;

        console.log($event,this.post);

    }

}

interface marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
}