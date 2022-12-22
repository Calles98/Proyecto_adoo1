import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { Global } from 'src/app/services/global';

@Component({
  selector: 'app-aprobado',
  templateUrl: './aprobado.component.html',
  styleUrls: ['./aprobado.component.css'],
  providers: [EventService]
})
export class AprobadoComponent implements OnInit {


  public events: Event[]; 
  public url: string; 

  constructor(
    private _eventService: EventService
  ) {
    this.events = []; 
    this.url = Global.url
   }

  ngOnInit(): void {
    this.getEvents();
  }

  getEvents(){
    this._eventService.getEvents().subscribe(
      response => {
        this.events = response.events;
      },
      error => {
        console.log(<any>error);
      }
    );
  }

}
