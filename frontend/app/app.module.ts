import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {RouterModule}   from '@angular/router';

import {AppComponent}       from './app.component';
import {MapComponent}       from './map.component';
import { HttpModule } from '@angular/http';


import { AgmCoreModule } from 'angular2-google-maps/core';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDjkDa4WA4I-2wRDBWB7kKVdFCeEON_H5A'
        }),
        RouterModule.forRoot([
            {
                path: 'map',
                component: MapComponent
            },
            {
                path: '',
                redirectTo: '/map',
                pathMatch: 'full'
            },
        ]),
        HttpModule
    ],
    providers: [],
    declarations: [AppComponent,MapComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}
