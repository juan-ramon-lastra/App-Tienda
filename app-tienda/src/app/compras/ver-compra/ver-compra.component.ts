import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/clases/compra';
import { Producto } from 'src/app/clases/producto';
import swal from 'sweetalert2';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-ver-compra',
  templateUrl: './ver-compra.component.html',
  styles: [
  ]
})
export class VerCompraComponent implements OnInit {

  titulo:string = "Datos de la compra";

  compra!:Compra;
  productos!:Producto[];

  hayProductos:boolean = false;

  constructor(
    private compraService:CompraService,
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
          this.compraService.getCompra(id).subscribe(
            resp => {
              this.compra = resp
            }
          )
          this.compraService.getProductosCompra(id).subscribe(
            resp => {
              if (resp.length > 0) {
                this.productos = resp;
                this.hayProductos = true;
              }
            }
          );
        }
      }
    )
  }

}
