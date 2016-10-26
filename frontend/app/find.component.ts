import {Component, OnInit} from '@angular/core';
import {JobsService} from './jobs.service';
import {GeolocationService} from "./geolocation.service";
import {marker} from "./marker";

@Component({
    selector: 'find-component',
    templateUrl: 'views/find-component.html',
    providers: [JobsService,GeolocationService]
})
export class FindComponent implements OnInit  {

    constructor(private jobService: JobsService, private geo: GeolocationService) {
    }

    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;

    markers: marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A',
            draggable: true
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: 'B',
            draggable: false
        },
        {
            lat: 51.723858,
            lng: 7.895982,
            label: 'C',
            draggable: true
        }
    ];

    setPosition(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
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

    onTest() {

        var prom = this.jobService.getList();

        console.log(prom);

        return false;
    }

}