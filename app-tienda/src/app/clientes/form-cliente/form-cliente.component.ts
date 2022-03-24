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
  titulo2:string = "Editar Cliente";

  cliente:Cliente = new Cliente();

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activatedRoute:ActivatedRoute
  ) { }

  ngOnInit(): void {

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
        swal('Nuevo cliente: ', `${this.cliente.nombre} creado con éxito`, 'success');
        this.router.navigate(['/clientes']);
      },
      err => {
        console.error('Error en el backend, código: ', err.status);
      }
    );
  }

  update():void {
    console.log(this.cliente);
    this.clienteService.update(this.cliente).subscribe(
      resp => {
        swal('Cliente: ', `${this.cliente.nombre} actualizado con éxito!`, 'success');
        this.router.navigate(['/clientes']);
      },
      err => {
        console.error("rror en el backend, código: " + err.status);
      }
    );
  }

}
