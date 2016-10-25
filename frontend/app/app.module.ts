import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {RouterModule}   from '@angular/router';
import {HttpModule}     from '@angular/http';

import {AppComponent}       from './app.component';
import {PostAJobComponent}       from './post-a-job.component';
import {MapComponent}       from './map.component';

import {AgmCoreModule} from 'angular2-google-maps/core';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDjkDa4WA4I-2wRDBWB7kKVdFCeEON_H5A'
        }),
        RouterModule.forRoot([
            {
                path: 'post',
                component: PostAJobComponent
            },
            {
                path: 'map',
                component: MapComponent
            },
            {
                path: '',
                redirectTo: '/map',
                pathMatch: 'full'
            },
        ])
    ],
    providers: [],
    declarations: [AppComponent, MapComponent, PostAJobComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}
