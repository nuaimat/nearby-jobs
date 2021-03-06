import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs';
import { Subject }    from 'rxjs/Subject';


@Injectable()
export class LoginService {

    private headers = new Headers();
    private currentUser = new Subject<string>();
    private loggedIn = false;
    private endpointUrl = "http://localhost:8080/users";

    /**
    * Observable string streams
    */
    logInAnnouncement$ = this.currentUser.asObservable();

    constructor(private http: Http) {
    }


    announceLogIn(user: string) : Observable<string>{

        
        this.logInAnnouncement$.subscribe(email=>{
            console.log(email + "logged in");
            this.loggedIn = true;
        });
        // for testing purpose only, password is same as user for now
        // needs to be changed in the actual prod env.
        this.http.post(this.endpointUrl + "/login", {username: user, password: user})
            .toPromise()
            .then(() => this.currentUser.next(user));

        return this.logInAnnouncement$;
    }

    logout() {
        this.currentUser.next(null);
        this.http.get(this.endpointUrl+ "/logout")
            .toPromise();
    }

    isLoggedIn(): boolean {
        console.log("Checking if logged in");
        return this.loggedIn;
    }
}