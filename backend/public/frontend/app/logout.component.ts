import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { LoginService } from './login.service';

@Component({
    selector: 'logout-component',
    template: 'logout'
})

export class LogoutComponent implements OnInit{

    constructor(private router: Router, private loginService: LoginService){}

    ngOnInit(): void {
        console.log('here logout');
        this.loginService.logout();
        this.router.navigate(['login']);

    }
}
