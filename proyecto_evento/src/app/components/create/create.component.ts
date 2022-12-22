import { Component, OnInit } from '@angular/core';
import { Event } from 'src/app/models/event';
import { Global } from 'src/app/services/global';
import { EventService } from 'src/app/services/event.service';
import { UploadService } from 'src/app/services/upload.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [
    EventService, 
    UploadService
  ]
})
export class CreateComponent implements OnInit {

  public title: string;
  public event: Event;
  public status: string;
  public url: string;

  constructor(
    private _eventService: EventService, 
    private _uploadService: UploadService
    
  ) { 
    this.title = "Crear Evento"; 
    this.event = new Event('', '', '', '', '', '', 0, 0, false);
    this.status = ''; 
    this.url = Global.url; 
  }

  ngOnInit(): void {
  }

  onSubmit(form: any){
    this._eventService.saveEvent(this.event).subscribe(
      response => {
        if(response.event){
          this.status = 'success'; 
          form.reset();
        }else{
          this.status = 'failed'; 
        }

      }, 
      error => {  
        console.log(<any>error);
      }
    );
  }

}
