import {Component} from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';


@Component({
    selector: 'login-component',
    templateUrl: 'views/login-component.html'
})

export class LoginComponent {
    constructor(private loginService: LoginService, private router: Router) {
    }
    active = true;

    login = {
        userName: null,
        password: null
    };

    onSubmit() {

        this.active = false;
        this.loginService.announceLogIn(this.login.userName);
        this.router.navigate(['/']);

    }

}
