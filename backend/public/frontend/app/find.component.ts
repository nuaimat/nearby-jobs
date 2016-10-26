import {Component, OnInit} from '@angular/core';
import {JobsService} from './jobs.service';
import {GeolocationService} from "./geolocation.service";
import {marker} from "./marker";
import './rxjs-operators';
import {Job} from "./job";
import {LatLon} from "./LatLon";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";



@Component({
    selector: 'find-component',
    templateUrl: 'views/find-component.html',
    providers: [JobsService,GeolocationService]
})
export class FindComponent implements OnInit  {

    constructor(private jobService: JobsService, private geo: GeolocationService) {
    }

    // google maps zoom level
    zoom: number = 18;

    // initial center position for the map
    lat: number = -91.96061968803406;
    lng: number = 41.00641495699017;


    jobs: Observable<Job[]>;
    coords = new Subject<LatLon>();

    setPosition(position){
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
    }

    ngOnInit(): void {

        var self = this;
        this.jobs = this.coords
            .debounceTime(800) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(latLon => latLon //switch to new observable each time
                // return the http search observable
                ?self.jobService.getNearby(latLon.lat, latLon.lon)
                // or the observable of empty heroes if no search term
                :Observable.of<Job[]>([]))
            .catch(error=>{
                // TODO: real error handling
                console.log(error);
                return Observable.of<Job[]>([]);
            })
        this.geo.getLocation().subscribe(
            function(position) {
                self.setPosition(position);
                let newC = new LatLon(position);
                self.coords.next(newC);
            },
            function(error) {
                console.log(error);
            }
        );

    }

    refreshJobs(position): void {
        this.coords.next(new LatLon(position));
    }

    onTest() {

        var prom = this.jobService.getList();

        console.log(prom);

        return false;
    }

    applyForJob(id: string, job: Job): boolean {
        console.log("Applying for " + id);
        this.jobService.applyForJob(id);
        return false;
    }

}