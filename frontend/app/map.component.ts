import {Component} from '@angular/core';
@Component({
    selector: 'map-component',
    templateUrl: 'views/map-component.html',
    //styleUrls: ['map.component.css'],
})
export class MapComponent {
    title: string = 'Job Posting'
    lat: number = 41.00641495699017;
    lng: number = -91.96061968803406; // location[0]
    zoom: number = 18;
    disableDoubleClickZoom: boolean = true;
    scrollwheel :boolean = false;
    zoomControl: boolean = true;


    showAddJobDialog(event) {
        console.log(event);
    }
}
