import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';
import { Compra } from '../clases/compra';
import { AuthService } from '../usuarios/auth.service';
import { CompraService } from './compra.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: [
  ]
})
export class ComprasComponent implements OnInit {

  compras!: Compra[];

  constructor(
    private compraService:CompraService,
    public authService:AuthService
  ) { }

  ngOnInit(): void {
    this.compraService.getCompras().subscribe(
      resp => {
        this.compras = resp
      }
    );
  }

  eliminarCompra(compra:Compra) {
    swal({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar la compra con fecha ${compra.fecha}?`,
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
        this.compraService.delete(compra.id).subscribe(
          resp => {
            this.compras = this.compras.filter(comp => comp !== compra)
            swal('Compra eliminada ', `La compra con fecha ${compra.fecha} se ha eliminado con éxito`, 'success');
          }
        )
      }
    });

  }

}
