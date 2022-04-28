import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Components
import { CrearUserComponent } from './components/crear-user/crear-user.component';
import { ListarUsersComponent } from './components/listar-users/listar-users.component';
import { ListarEventsComponent } from './components/listar-events/listar-events.component';

// Routes
const routes: Routes = [
  { path: '', component: ListarUsersComponent },
  { path: 'crear-user', component: CrearUserComponent },
  { path: 'editar-user/:name', component: CrearUserComponent },
  { path: 'event', component: ListarEventsComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }, // In case of a wrong URL, the code redirects to the main path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
