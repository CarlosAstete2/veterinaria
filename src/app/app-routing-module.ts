import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'mascotas', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'mascotas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/mascotas/mascotas.module').then((m) => m.MascotasModule),
  },
  {
    path: 'citas',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./modules/citas/citas.module').then((m) => m.CitasModule),
  },
  { path: '**', redirectTo: 'mascotas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
