import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductosComponent } from './productos.component';
import { FormProductoComponent } from './form-producto/form-producto.component';
import { VerProductoComponent } from './ver-producto/ver-producto.component';
import { ProductoService } from './producto.service';
import { CompraService } from '../compras/compra.service';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from '../routes/app-routing.module';
import { FormProductoEditarComponent } from './form-producto-editar/form-producto-editar.component';

@NgModule({
  declarations: [
    ProductosComponent,
    FormProductoComponent,
    VerProductoComponent,
    FormProductoEditarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule
  ],
  exports: [
    ProductosComponent,
    FormProductoComponent,
    VerProductoComponent,
    FormProductoEditarComponent
  ],
  providers: [
    ProductoService,
    CompraService
  ]
})
export class ProductosModule { }
