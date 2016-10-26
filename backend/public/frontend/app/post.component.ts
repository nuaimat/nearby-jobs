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

    post = new JobPost();

    theMarker: marker = {
        lat: 41.00641495699017,
        lng: -91.96061968803406,
        draggable: true
    };

    // google maps zoom level
    zoom: number = 15;

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

    setPosition(position){

        this.theMarker.lat = position.coords.latitude;
        this.theMarker.lng = position.coords.longitude;

        this.post.lat = position.coords.latitude;
        this.post.lng = position.coords.longitude;

    }



    onSubmit() {

        console.log(this.post);

        var prom = this.jobService.create( this.post );

        console.log(prom);

        return false;
    }

    onTest() {

        var prom = this.jobService.getList();

        console.log(prom);

        return false;
    }

    markerDragEnd(position): void {
        this.post.lat = position.coords.lat;
        this.post.lng = position.coords.lng;
        console.log(this.post);
    }




}