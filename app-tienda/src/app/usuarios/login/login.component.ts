import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/clases/usuario';
import swal from 'sweetalert2';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  usuario:Usuario = new Usuario();

  constructor(
    private authService:AuthService,
    private router:Router
  ) { }

  ngOnInit(): void {

  }

  login():void {

    if (this.usuario.username == null || this.usuario.password == null) {
      swal("Error Login", "Username o Password vacío!", "error");
      return;
    }

    this.authService.login(this.usuario).subscribe(
      resp => {
        this.authService.guardarUsuario(resp.access_token);
        this.authService.guardarToken(resp.access_token);
        let usuario = this.authService.usuario; // llamada al metodo get usuario del service

        this.router.navigate(['/clientes']);
        swal('Login', `Hola ${usuario.username}, ha iniciado sesión con éxito`, 'success');
      },
      err => {
        if (err.status == 400) {
          swal('Error login', 'Usuario o Password incorrectos!', 'error');
        }
      }
    );
  }

}
