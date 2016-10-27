import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class LoginService {

    private headers = new Headers();
    private currentUser = new Subject<string>();

    /**
    * Observable string streams
    */
    logInAnnouncement$ = this.currentUser.asObservable();

    constructor(private http: Http) {
    }


    announceLogIn(user: string) : Observable<string>{
        this.currentUser.next(user);
        this.logInAnnouncement$.subscribe(email=>{
            console.log(email + "logged in");
        });
        return this.logInAnnouncement$;
    }

    logout() {
        this.currentUser.next(null);
    }
}