import {Component} from '@angular/core';

@Component({
    selector: 'login-component',
    templateUrl: 'views/login-component.html'
})

export class LoginComponent {

    active = true;

    login = {
        userName: null,
        password: null
    };

    onSubmit() {

        this.active = false;

        // var prom = this.jobService.create(this.post);

        /*
         prom.then(data => {
         console.log(data)
         this.post = new JobPost();
         });
         */

        setTimeout(() => this.active = true, 20);


    }

}
