import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/clases/producto';
import swal from 'sweetalert2';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-ver-producto',
  templateUrl: './ver-producto.component.html',
  styles: [
  ]
})
export class VerProductoComponent implements OnInit {

  titulo:string = "Detalle de producto";

  producto!:Producto;

  constructor(
    private productoService:ProductoService,
    private activedRoute:ActivatedRoute,
    private router:Router
  ) { }

  ngOnInit(): void {

    if (!sessionStorage.getItem('token')) {
      this.router.navigate(['/login']);
      swal('No Logueado!', 'Debes iniciar sesión para acceder a la página', 'error');
      return;
    }

    this.activedRoute.paramMap.subscribe(
      params => {
        let id:number = +params.get('id')!;
        if (id) {
          this.productoService.getProducto(id).subscribe(
            resp => {
              this.producto = resp
            }
          )
        }
      }
    )
  }

}
