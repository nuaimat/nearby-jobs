import {Component, OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Rx";
import {Http, Response} from "@angular/http";
import {Job} from "./job";
import {Router} from "@angular/router";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {LatLon} from "./LatLon";
import {JobsService} from './jobs.service';



@Component({
    selector: 'map-component',
    templateUrl: 'views/map-component.html',
    //styleUrls: ['map.component.css'],
    providers:[ JobsService ]
})
export class MapComponent implements OnInit {

    title: string = 'Job Posting'
    lat: number = 41.00641495699017;
    lng: number = -91.96061968803406;
    zoom: number = 18;
    disableDoubleClickZoom: boolean = true;
    scrollwheel :boolean = false;
    zoomControl: boolean = true;


    constructor(
        private jobService: JobsService,
        private router: Router
    ){}

    jobs: Observable<Job[]>;
    private latLons = new Subject<LatLon>();

    showAddJobDialog(event) {
        console.log(event);
    }

    refreshMarkers(event) {
        this.latLons.next(event);
    }

    ngOnInit():void{
        this.jobs = this.latLons
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(latLon => latLon //switch to new observable each time
                // return the http search observable
                ?this.jobService.getNearby(latLon.lat, latLon.lon)
                // or the observable of empty heroes if no search term
                :Observable.of<Job[]>([]))
            .catch(error=>{
                // TODO: real error handling
                console.log(error);
                return Observable.of<Job[]>([]);
            })
    }
}
