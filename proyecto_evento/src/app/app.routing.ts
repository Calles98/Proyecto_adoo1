import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { AboutComponent } from "./components/about/about.component";
import { AprobarComponent } from "./components/aprobar/aprobar.component";
import { CreateComponent } from "./components/create/create.component";
import { DetailsComponent } from "./components/details/details.component";
import { EditComponent } from "./components/edit/edit.component";
import { EventoComponent } from "./components/evento/evento.component";
import { EventosComponent } from "./components/eventos/eventos.component";
import { ErrorComponent } from "./components/error/error.component";
import { AprobadoComponent } from "./components/aprobado/aprobado.component";


const appRoutes: Routes  = [
    {path: '', component: AboutComponent},
    {path: 'eventos', component: EventosComponent},
    {path: 'crear-solicitud', component: CreateComponent},
    {path: 'evento', component: EventoComponent},
    {path: 'evento/:id', component: DetailsComponent},
    {path: 'aprobar-evento:id', component: AprobarComponent},
    {path: 'editar-evento/:id', component: EditComponent},
    {path: 'eventos-aprobados', component: AprobadoComponent},
    {path: '**', component: ErrorComponent}


];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);