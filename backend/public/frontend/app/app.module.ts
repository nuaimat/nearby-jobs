import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {RouterModule}   from '@angular/router';
import {HttpModule}     from '@angular/http';


import {LoginComponent}       from './login.component';
import {LogoutComponent} from "./logout.component";
import {AppComponent}       from './app.component';
import {PostComponent}  from './post.component';
import {FindComponent}      from "./find.component";
import {AppliedComponent} from './applied.component';

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
                path: 'login',
                component: LoginComponent
            },
            {
                path: 'logout',
                component: LogoutComponent
            },
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
                redirectTo: '/find',
                pathMatch: 'full'
            },
        ])
    ],
    providers: [],
    declarations: [AppComponent, LoginComponent, LogoutComponent, PostComponent, FindComponent, AppliedComponent],
    bootstrap: [AppComponent]
})

export class AppModule {
}
