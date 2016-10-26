import {Component} from '@angular/core';
import {JobPost} from './job-post';
import {JobsService} from './jobs.service';
import {marker} from "./marker";


@Component({
    selector: 'post-component',
    templateUrl: 'views/post-component.html',
    providers: [JobsService]
    //styleUrls: ['map.component.css'],
})
export class PostComponent {

    constructor(private jobService: JobsService) {
    }

    theMarker: marker = {
        lat: 51.678418,
        lng: 7.809007,
        draggable: true
    };

    post = new JobPost();

    onSubmit() {

        var prom = this.jobService.create('test');

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