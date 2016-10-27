import {Component} from '@angular/core';
import { LoginService } from './login.service';


@Component({
    selector: 'app-component',
    templateUrl: 'views/app-component.html',
})
export class AppComponent {
    title = 'Job Posting';
    currentUser = null;

    constructor(private loginService: LoginService) {
      console.log(loginService);
      loginService.logInAnnouncement$.subscribe(user => {
          this.currentUser = user;
      });
  }
}
