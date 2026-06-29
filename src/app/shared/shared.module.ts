import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MascotaCardComponent } from './components/mascota-card/mascota-card.component';
import { CitaCardComponent } from './components/cita-card/cita-card.component';
import { EstadoCitaPipe } from './pipes/estado-cita.pipe';
import { FechaRelativaPipe } from './pipes/fecha-relativa.pipe';
import { ResaltarProximaDirective } from './directives/resaltar-proxima.directive';

@NgModule({
  declarations: [
    NavbarComponent,
    MascotaCardComponent,
    CitaCardComponent,
    EstadoCitaPipe,
    FechaRelativaPipe,
    ResaltarProximaDirective,
  ],
  imports: [CommonModule, RouterModule],
  exports: [
    NavbarComponent,
    MascotaCardComponent,
    CitaCardComponent,
    EstadoCitaPipe,
    FechaRelativaPipe,
    ResaltarProximaDirective,
    CommonModule,
  ],
})
export class SharedModule {}
