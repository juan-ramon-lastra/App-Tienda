import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerCompraComponent } from './ver-compra/ver-compra.component';
import { FormCompraComponent } from './form-compra/form-compra.component';
import { ComprasComponent } from './compras.component';
import { CompraService } from './compra.service';
import { AppRoutingModule } from '../routes/app-routing.module';
import { FormsModule } from '@angular/forms';
import { ClienteService } from '../clientes/cliente.service';
import { FormCompraEditarComponent } from './form-compra-editar/form-compra-editar.component';

@NgModule({
  declarations: [
    VerCompraComponent,
    FormCompraComponent,
    ComprasComponent,
    FormCompraEditarComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  exports: [
    VerCompraComponent,
    FormCompraComponent,
    ComprasComponent,
    FormCompraEditarComponent,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    CompraService,
    ClienteService
  ]
})
export class ComprasModule { }
