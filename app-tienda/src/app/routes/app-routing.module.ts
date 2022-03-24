import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClientesComponent } from '../clientes/clientes.component';
import { FormClienteEditarComponent } from '../clientes/form-cliente-editar/form-cliente-editar.component';
import { FormClienteComponent } from '../clientes/form-cliente/form-cliente.component';
import { VerClienteComponent } from '../clientes/ver-cliente/ver-cliente.component';
import { ComprasComponent } from '../compras/compras.component';
import { FormCompraEditarComponent } from '../compras/form-compra-editar/form-compra-editar.component';
import { FormCompraComponent } from '../compras/form-compra/form-compra.component';
import { VerCompraComponent } from '../compras/ver-compra/ver-compra.component';
import { FormProductoEditarComponent } from '../productos/form-producto-editar/form-producto-editar.component';
import { FormProductoComponent } from '../productos/form-producto/form-producto.component';
import { ProductosComponent } from '../productos/productos.component';
import { VerProductoComponent } from '../productos/ver-producto/ver-producto.component';
import { LoginComponent } from '../usuarios/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'clientes', component: ClientesComponent },
  { path: 'clientes/nuevo', component: FormClienteComponent },
  { path: 'clientes/editar/:id', component: FormClienteEditarComponent },
  { path: 'clientes/ver/:id', component: VerClienteComponent },
  { path: 'compras', component: ComprasComponent },
  { path: 'compras/nueva', component: FormCompraComponent },
  { path: 'compras/editar/:id', component: FormCompraEditarComponent },
  { path: 'compras/ver/:id', component: VerCompraComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'productos/nuevo', component: FormProductoComponent },
  { path: 'productos/editar/:id', component: FormProductoEditarComponent },
  { path: 'productos/ver/:id', component: VerProductoComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
