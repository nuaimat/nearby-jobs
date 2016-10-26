import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
    selector: 'logout-component',
    template: 'logout'
})

export class LogoutComponent implements OnInit{

    constructor(private router: Router){}

    ngOnInit(): void {
        console.log('here logout');

        this.router.navigate(['login']);

    }
}
