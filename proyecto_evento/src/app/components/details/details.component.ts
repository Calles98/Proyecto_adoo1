import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { EventService } from 'src/app/services/event.service';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
  providers: [EventService]
})
export class DetailsComponent implements OnInit {

  public url: string; 
  public event: Event; 

  constructor(

    private _eventService: EventService,
    private _route: ActivatedRoute,
    private _router: Router

  ) {
    this.url = Global.url; 
    this.event =  new Event('', '', '', '', '', '', 0, 0, false);
   }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];

      this.getProject(id);
    
       
    });
    
  }

  getProject(id:string){
    this._eventService.getEvent(id).subscribe(
      response => {
        this.event = response.event; 
      }, 
      error => {
        console.log(<any>error); 
      }
    );
  }

  aprobarEvento(valor: boolean){
    this.event.aproved = valor;
    this._eventService.updateEvent(this.event).subscribe(
      response => {
        console.log(response);
      }, 
      error => {
        console.log(<any>error);
      }
    );

  }

  borrarEvento(id:string){
    if(confirm("¿Está seguro que quiere declincar este evento (el evento se borrará)?")){
      this._eventService.deleteEvent(id).subscribe(
        response => {
          if(response){
            this._router.navigate(['/eventos']);
          }
        }, 
        error => {
          console.log(<any>error)
        }
      );
      
    }else{
      console.log("No se borró el evento");
    }
   
  }

}
