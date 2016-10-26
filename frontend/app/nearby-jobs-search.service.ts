import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Job} from "./job";
import {LanLon} from "./LanLon";

@Injectable()
export class NearByJobSearchService {
    constructor(private http: Http){}

    search(c:LanLon): Observable<Job[]>{
        return this.http
            .get(`http://localhost:8080/jobs/around/?lat=${c.lat}&lon=${c.lon}`)
            .map((r:Response)=>r.json().data as Job[]);
    }
}