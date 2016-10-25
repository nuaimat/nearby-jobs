import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule}    from '@angular/forms';
import {RouterModule}   from '@angular/router';

import {AppComponent}       from './app.component';
import {MapComponent}       from './map.component';

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
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
        ])
    ],
    declarations: [
        AppComponent,
        MapComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})

export class AppModule {
}
