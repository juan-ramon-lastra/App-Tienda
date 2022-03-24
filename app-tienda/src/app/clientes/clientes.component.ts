import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Cliente } from '../clases/cliente';
import { AuthService } from '../usuarios/auth.service';
import { ClienteService } from './cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styles: [
  ]
})
export class ClientesComponent implements OnInit {

  clientes!: Cliente[];

  constructor(
    private clientService:ClienteService,
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    this.clientService.getClients().subscribe(
      resp => {
        this.clientes = resp
      }
    );
  }

  eliminarCliente(cliente:Cliente) {
    swal({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar el cliente ${cliente.nombre} ${cliente.apellidos}?`,
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
        this.clientService.delete(cliente.id).subscribe(
          resp => {
            this.clientes = this.clientes.filter(cli => cli !== cliente)
            swal('Cliente eliminado', `Cliente ${cliente.nombre} eliminado con éxito`, 'success');
          }
        )
      }
    });

  }

}
