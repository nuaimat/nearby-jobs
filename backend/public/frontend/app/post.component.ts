import {Component, OnInit} from '@angular/core';
import {JobPost} from './job-post';
import {JobsService} from './jobs.service';
import {marker} from "./marker";
import {GeolocationService} from "./geolocation.service";
import {LoginService} from './login.service';
import {Router} from '@angular/router'

@Component({
    selector: 'post-component',
    templateUrl: 'views/post-component.html',
    providers: [JobsService, GeolocationService]
    //styleUrls: ['map.component.css'],
})

export class PostComponent implements OnInit {

    constructor(private jobService: JobsService, private geo: GeolocationService, private loginService: LoginService, private router: Router) {
    }

    active = true;
    post = new JobPost();
    jobCategories;

    theMarker: marker = {
        lat: 41.00641495699017,
        lng: -91.96061968803406,
        draggable: true
    };

    // google maps zoom level
    zoom: number = 18;

    ngOnInit(): void {
        if( !this.loginService.isLoggedIn() ) {
            this.router.navigate(['/login']);
            return;
        }
        this.jobCategories = this.jobService.getCategoriesList();

        var self = this;

        this.geo.getLocation().subscribe(
            function (position) {
                self.setPosition(position);
            },
            function (error) {
                console.log(error);
            }
        );

    }

    setPosition(position) {

        this.theMarker.lat = position.coords.latitude;
        this.theMarker.lng = position.coords.longitude;

        this.post.lat = position.coords.latitude;
        this.post.lng = position.coords.longitude;

    }

    markerDragEnd(position): void {
        this.post.lat = position.coords.lat;
        this.post.lng = position.coords.lng;
        console.log(this.post);
    }

    message: string;
    onSubmit() {

        this.active = false;

        var prom = this.jobService.create(this.post);

        prom.then(data => {
            console.log(data)
            this.post = new JobPost();
            this.message = "Job added successfully";
        });

        setTimeout(() => this.active = true, 20);

    }

}