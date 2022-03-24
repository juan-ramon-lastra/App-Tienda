import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/clases/compra';
import { Producto } from 'src/app/clases/producto';
import { CompraService } from 'src/app/compras/compra.service';
import swal from 'sweetalert2';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-form-producto-editar',
  templateUrl: './form-producto-editar.component.html',
  styles: [
  ]
})
export class FormProductoEditarComponent implements OnInit {

  titulo:string = "Actualizar Producto";

  producto:Producto = new Producto();

  compras!:Compra[];

  constructor(
    private compraService:CompraService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private productoService:ProductoService
  ) { }

  ngOnInit(): void {
    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/login']);
      swal('No Logueado!', 'Debes iniciar sesión para acceder a la página', 'error');
      return;
    }

    this.activatedRoute.paramMap.subscribe(
      params => {
        let id = +params.get('id')!;
        if (id) {
          this.productoService.getProducto(id).subscribe(
            (resp) => this.producto = resp
          )
        }
      }
    );
    this.compraService.getCompras().subscribe(
      resp => {
        this.compras = resp;
      }
    )
  }

  update():void {
    console.log(this.producto);
    this.productoService.update(this.producto).subscribe(
      resp => {
        swal('Producto: ', `${this.producto.nombre} actualizado con éxito!`, 'success');
        this.router.navigate(['/productos']);
      },
      err => {
        console.error("Error en el backend, código: " + err.status);
      }
    );
  }

}
