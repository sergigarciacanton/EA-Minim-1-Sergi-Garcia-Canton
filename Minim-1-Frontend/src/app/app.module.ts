import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule } from '@angular/common/http';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

// Components
import { AppComponent } from './app.component';
import { CrearUserComponent } from './components/crear-user/crear-user.component';
import { ListarUsersComponent } from './components/listar-users/listar-users.component';
import { ListarEventsComponent } from './components/listar-events/listar-events.component';
import { ListarDenunciasComponent } from './components/listar-denuncias/listar-denuncias.component';
import { CrearDenunciaComponent } from './components/crear-denuncia/crear-denuncia.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearUserComponent,
    ListarUsersComponent,
    ListarEventsComponent,
    ListarDenunciasComponent,
    CrearDenunciaComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
