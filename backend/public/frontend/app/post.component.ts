import {Component, OnInit} from '@angular/core';
import {JobPost} from './job-post';
import {JobsService} from './jobs.service';
import {marker} from "./marker";
import {GeolocationService} from "./geolocation.service";



@Component({
    selector: 'post-component',
    templateUrl: 'views/post-component.html',
    providers: [JobsService, GeolocationService]
    //styleUrls: ['map.component.css'],
})
export class PostComponent implements OnInit {

    constructor(private jobService: JobsService,  private geo: GeolocationService) {
    }

    theMarker: marker = {
        lat: -91.96061968803406,
        lng: 41.00641495699017,
        draggable: true
    };


    // google maps zoom level
    zoom: number = 18;

    // initial center position for the map
    lat: number = -91.96061968803406;
    lng: number = 41.00641495699017;

    setPosition(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }

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


    ngOnInit(): void {

        var self = this;

        this.geo.getLocation().subscribe(
            function(position) {
                self.setPosition(position);
            },
            function(error) {
                console.log(error);
            }
        );

    }

}