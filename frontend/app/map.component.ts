import {Component, OnInit} from "@angular/core";
import {Subject} from "rxjs/Subject";
import {Observable} from "rxjs/Observable";
import {Http, Response} from "@angular/http";
import {NearByJobSearchService} from "./nearby-jobs-search.service";
import {Job} from "./job";
import {Router} from "@angular/router";
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import {LanLon} from "./LanLon";


@Component({
    selector: 'map-component',
    templateUrl: 'views/map-component.html',
    //styleUrls: ['map.component.css'],
    providers:[ NearByJobSearchService ]
})
export class MapComponent implements OnInit {
    title: string = 'Job Posting'
    lat: number = 41.00641495699017;
    lng: number = -91.96061968803406; // location[0]
    zoom: number = 18;
    disableDoubleClickZoom: boolean = true;
    scrollwheel :boolean = false;
    zoomControl: boolean = true;


    constructor(
        private nearByJobSearchService: NearByJobSearchService,
        private router: Router
    ){}

    jobs: Observable<Job[]>;
    private lanLons = new Subject<LanLon>();

    showAddJobDialog(event) {
        console.log(event);
    }

    refreshMarkers(event) {
        this.lanLons.next(event);
    }

    ngOnInit():void{
        this.jobs = this.lanLons
            .debounceTime(300) // wait for 300ms pause in events
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(lanLon => lanLon //switch to new observable each time
                // return the http search observable
                ?this.nearByJobSearchService.search(lanLon)
                // or the observable of empty heroes if no search term
                :Observable.of<Job[]>([]))
            .catch(error=>{
                // TODO: real error handling
                console.log(error);
                return Observable.of<Job[]>([]);
            })
    }
}
