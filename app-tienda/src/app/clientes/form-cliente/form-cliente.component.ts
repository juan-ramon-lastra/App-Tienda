import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/clases/cliente';
import swal from 'sweetalert2';
import { ClienteService } from '../cliente.service';

@Component({
  selector: 'app-form-cliente',
  templateUrl: './form-cliente.component.html',
  styles: [
  ]
})
export class FormClienteComponent implements OnInit {

  titulo:string = "Nuevo Cliente";

  cliente:Cliente = new Cliente();

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activatedRoute:ActivatedRoute
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
          this.clienteService.getCliente(id).subscribe(
            (resp) => this.cliente = resp
          )
        }
      }
    )

  }

  create():void {
    console.log("formulario enviado");
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      resp => {
        swal('Nuevo cliente', `${this.cliente.nombre} creado con éxito`, 'success');
        this.router.navigate(['/clientes']);
      },
      err => {
        console.error('Error en el backend, código: ', err.status);
      }
    );
  }



}
