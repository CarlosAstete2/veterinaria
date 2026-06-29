import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AgendaCitasComponent } from './agenda-citas/agenda-citas.component';
import { NuevaCitaComponent } from './nueva-cita/nueva-cita.component';

const routes: Routes = [
  { path: '', component: AgendaCitasComponent },
  { path: 'nueva', component: NuevaCitaComponent },
];

@NgModule({
  declarations: [AgendaCitasComponent, NuevaCitaComponent],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class CitasModule {}
