import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientesComponent } from './clientes.component';
import { FormClienteComponent } from './form-cliente/form-cliente.component';
import { VerClienteComponent } from './ver-cliente/ver-cliente.component';
import { ClienteService } from './cliente.service';
import { AppRoutingModule } from '../routes/app-routing.module';
import { FormsModule } from '@angular/forms';
import { FormClienteEditarComponent } from './form-cliente-editar/form-cliente-editar.component';

@NgModule({
  declarations: [
    ClientesComponent,
    FormClienteComponent,
    VerClienteComponent,
    FormClienteEditarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    ClientesComponent,
    FormClienteComponent,
    VerClienteComponent,
    FormClienteEditarComponent
  ],
  providers: [
    ClienteService
  ]
})
export class ClientesModule { }
