import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';
import { Compra } from 'src/app/clases/compra';
import { ClienteService } from 'src/app/clientes/cliente.service';
import swal from 'sweetalert2';
import { CompraService } from '../compra.service';

@Component({
  selector: 'app-form-compra',
  templateUrl: './form-compra.component.html',
  styles: [
  ]
})
export class FormCompraComponent implements OnInit {

  titulo:string = "Nueva Compra";

  compra:Compra = new Compra();

  clientes!:Cliente[];

  constructor(
    private compraService:CompraService,
    private router:Router,
    private activatedRoute:ActivatedRoute,
    private clienteService:ClienteService
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
          this.compraService.getCompra(id).subscribe(
            (resp) => this.compra = resp
          )
        }
      }
    );
    this.clienteService.getClients().subscribe(
      resp => {
        this.clientes = resp;
      }
    )
  }

  create():void {
    console.log(this.compra);
    this.compraService.create(this.compra).subscribe(
      resp => {
        swal('Nueva compra: ', `Creada con éxito el dia ${this.compra.fecha}`, 'success');
        this.router.navigate(['/compras']);
      },
      err => {
        console.error('Error en el backend, código: ', err.status);
      }
    );
  }


}
