import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Producto } from '../clases/producto';
import { AuthService } from '../usuarios/auth.service';
import { ProductoService } from './producto.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styles: [
  ]
})
export class ProductosComponent implements OnInit {

  productos!: Producto[];

  constructor(
    private productoService:ProductoService,
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    this.productoService.getproductos().subscribe(
      resp => {
        this.productos = resp
      }
    );
  }

  eliminarProducto(producto:Producto) {
    swal({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar el producto ${producto.nombre} marca ${producto.marca}?`,
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, estoy seguro!",
      cancelButtonText: "No, cancelar!",
      confirmButtonClass: "btn btn-success",
      cancelButtonClass: "btn btn-danger",
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.productoService.delete(producto.id).subscribe(
          resp => {
            this.productos = this.productos.filter(pro => pro !== producto)
            swal('Producto eliminado', `Producto ${producto.nombre} eliminado con éxito`, 'success');
          }
        )
      }
    });

  }

}
