import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
// Add the RxJS Observable operators.
import './rxjs-operators';

import {JobPost} from "./job-post";
import {Job} from "./job";
import {Observable} from "rxjs/Observable";


@Injectable()
export class JobsService {

    constructor(private http: Http) {
    }

    private endpointUrl = 'http://localhost:8080/jobs';

    getList(): Promise<JobPost[]> {
        return this.http.get(this.endpointUrl)
            .toPromise()
            .then(response => response.json().data as JobPost[])
            .catch(this.handleError);
    }

    create(post: JobPost): Promise<JobPost> {

        let body = JSON.stringify(post);
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});

        return this.http.post(this.endpointUrl, body, options)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);

    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }


    private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Promise.reject(errMsg);
    }

    getNearby(lat, lng): Observable<Job[]>{
        return this.http
            .get(`${this.endpointUrl}/around/?lat=${lat}&lon=${lng}`)
            .map((r:Response)=>r.json().data as Job[]);
    }

    getMyAppliedJobs(): Observable<Job[]>{
        return this.http
            .get(`${this.endpointUrl}/my/`)
            .map((r:Response)=>r.json().data as Job[]);
    }

    getMyPostedJobs(): Observable<Job[]>{
        return this.http
            .get(`${this.endpointUrl}/my/posted/`)
            .map((r:Response)=>r.json().data as Job[]);
    }

    applyForJob(id): boolean{
        this.http
            .put(`${this.endpointUrl}/apply/${id}`,{id: id})
            .toPromise();
        return true;
    }

    getCategoriesList(): string[] {
        return ["accounting", "transporation", "gardening", "crafting", "plummery", "art",
    "building", "computer maintenance", "computer networks", "bartender", "baby sitting", "nursery",
    "help elders", "cleaning"]
    }

    cancelJobApplication(id): boolean {
        this.http
            .delete(`${this.endpointUrl}/unapply/${id}`)
            .toPromise();
        return true;
    }

    assignJobApplication(id:string, emp: string): boolean {
        try {
        this.http
            .put(`${this.endpointUrl}/assign/${id}/${emp}`,{})
            .toPromise();
        }catch(err){
            this.handleError(err);
        }
        return true;
    }

}
