import {Component} from '@angular/core';
import { LoginService } from './login.service';

@Component({
    selector: 'login-component',
    templateUrl: 'views/login-component.html'
})

export class LoginComponent {
    constructor(private loginService: LoginService) {
    }
    active = true;

    login = {
        userName: null,
        password: null
    };

    onSubmit() {

        this.active = false;
        this.loginService.announceLogIn(this.login.userName);

    }

}
