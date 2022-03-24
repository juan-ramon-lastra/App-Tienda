import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Compra } from 'src/app/clases/compra';
import { Producto } from 'src/app/clases/producto';
import { CompraService } from 'src/app/compras/compra.service';
import swal from 'sweetalert2';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-form-producto',
  templateUrl: './form-producto.component.html',
  styles: [
  ]
})
export class FormProductoComponent implements OnInit {

  titulo:string = "Nuevo Producto";
  titulo2:string = "Editar Producto";

  producto:Producto = new Producto();

  compras!:Compra[];

  constructor(
    private compraService:CompraService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private productoService:ProductoService
  ) { }

  ngOnInit(): void {
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

  create():void {
    console.log(this.producto);
    this.productoService.create(this.producto).subscribe(
      resp => {
        swal('Nuevo producto: ', `${this.producto.nombre} guardado con éxito`, 'success');
        this.router.navigate(['/productos']);
      },
      err => {
        console.error('Error en el backend, código: ', err.status);
      }
    );
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
