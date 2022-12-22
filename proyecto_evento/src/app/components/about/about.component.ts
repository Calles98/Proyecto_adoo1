import { Component, OnInit } from '@angular/core';
import { subscriptionLogsToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public title: string; 
  public subtitle: string; 

  constructor() { 
    this.title = "Proyecto de Solicitud de Eventos"; 
    this.subtitle = "Análisis y Diseño Orientado a Objetos"; 
  }

  ngOnInit(): void {
  }

}
