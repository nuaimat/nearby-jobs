import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {RouterModule}   from '@angular/router';
import {HttpModule}     from '@angular/http';

import {AppComponent}       from './app.component';
import {PostComponent}  from './post.component';
import {FindComponent}      from "./find.component";
import {AppliedComponent} from "./applied.component";

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
                component: PostComponent
            },
            {
                path: 'find',
                component: FindComponent
            },
            {
                path: 'applied',
                component: AppliedComponent
            },
            {
                path: '',
                redirectTo: '/map',
                pathMatch: 'full'
            },
        ])
    ],
    providers: [],
    declarations: [AppComponent, PostComponent, FindComponent, AppliedComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}
