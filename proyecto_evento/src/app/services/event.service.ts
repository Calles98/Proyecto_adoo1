import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs";
import { Event } from "../models/event";
import { Global} from "./global"; 
import { UrlCreationOptions } from "@angular/router";
import { subscriptionLogsToBeFn } from "rxjs/internal/testing/TestScheduler";
import { identifierName } from "@angular/compiler";

@Injectable()
export class EventService{
    public url: string; 

    constructor(
        private _http: HttpClient
    ){
        this.url = Global.url; 
    }

    saveEvent(event:Event): Observable<any>{
        let params = JSON.stringify(event); 
        let headers = new HttpHeaders().set('content-type', 'application/json'); 

        return this._http.post(this.url + 'save-event', params, {headers: headers});
    }

    getEvents(): Observable<any>{
        let headers = new HttpHeaders().set('content-type', 'application/json');

        return this._http.get(this.url + 'events', {headers: headers});
    }

    getEvent(id:string): Observable<any>{
        let headers = new HttpHeaders().set('content-type', 'application/json');

        return this._http.get(this.url + 'event/' + id, {headers: headers});
    }

    updateEvent(event: Event): Observable<any>{
		let params = JSON.stringify(event);
		let headers = new HttpHeaders().set('Content-type', 'application/json');

		return this._http.put(this.url+'event/'+event._id, params, {headers: headers});
	}

     deleteEvent(id:string): Observable<any>{
        let headers = new HttpHeaders().set('content-type', 'application-json');

        return this._http.delete(this.url + 'event/' + id, {headers:headers});
     }
}