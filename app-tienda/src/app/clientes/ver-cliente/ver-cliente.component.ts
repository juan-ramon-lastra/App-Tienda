import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';
import { Compra } from 'src/app/clases/compra';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-ver-cliente',
  templateUrl: './ver-cliente.component.html',
  styles: [
  ]
})
export class VerClienteComponent implements OnInit {

  titulo:string = "Datos del cliente";

  cliente!:Cliente;
  compras!:Compra[];

  hayCompras:boolean = false;

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activedRoute:ActivatedRoute
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
          this.clienteService.getCliente(id).subscribe(
            resp => {
              this.cliente = resp
            }
          )
          this.clienteService.getComprasCliente(id).subscribe(
            resp => {
              if (resp.length > 0) {
                this.compras = resp;
                this.hayCompras = true;
              }
            }
          );
        }
      }
    )

  }



}


