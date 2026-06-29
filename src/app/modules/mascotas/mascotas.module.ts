import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ListaMascotasComponent } from './lista-mascotas/lista-mascotas.component';
import { RegistroMascotaComponent } from './registro-mascota/registro-mascota.component';
import { HistorialMascotaComponent } from './historial-mascota/historial-mascota.component';

const routes: Routes = [
  { path: '', component: ListaMascotasComponent },
  { path: 'nueva', component: RegistroMascotaComponent },
  { path: ':id/editar', component: RegistroMascotaComponent },
  { path: ':id/historial', component: HistorialMascotaComponent },
];

@NgModule({
  declarations: [
    ListaMascotasComponent,
    RegistroMascotaComponent,
    HistorialMascotaComponent,
  ],
  imports: [SharedModule, FormsModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class MascotasModule {}
