import {Component} from '@angular/core';
@Component({
    selector: 'map-component',
    templateUrl: 'views/map-component.html',
    //styleUrls: ['map.component.css'],
})
export class MapComponent {
    title: string = 'Job Posting'
    lat: number = 51.678418;
    lng: number = 7.809007;
}
