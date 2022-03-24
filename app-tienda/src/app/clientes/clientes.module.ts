import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { VerClienteComponent } from './ver-cliente/ver-cliente.component';
import { ClienteService } from './cliente.service';
import { AppRoutingModule } from '../routes/app-routing.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ClientesComponent,
    FormClienteComponent,
    VerClienteComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    ClientesComponent,
    FormClienteComponent,
    VerClienteComponent
  ],
  providers: [
    ClienteService
  ]
})
export class ClientesModule { }
