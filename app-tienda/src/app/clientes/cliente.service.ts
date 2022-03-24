import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Cliente } from '../clases/cliente';
import { Compra } from '../clases/compra';
import { AuthService } from '../usuarios/auth.service';

const urlEndPoint:string = "http://localhost:9090/api/clientes";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { }

  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  agregarAuthorization():any {
    let token = this.authService.token;
    if (token != null) {
      return this.httpHeaders.append('Authorization','Bearer '+token);
    }
  }

  // Mostrar todos los clientes
  getClients():Observable<Cliente[]> {
    return this.http.get(urlEndPoint).pipe(
      map( (response) => response as Cliente[] )
    );
  }

  // Crear un nuevo cliente
  create(cliente:Cliente):Observable<Cliente> {
    return this.http.post<Cliente>(`${urlEndPoint}/nuevo`, cliente, { headers: this.agregarAuthorization() });
  }

  // Obtener un cliente por su ID
  getCliente(id:number):Observable<Cliente> {
    return this.http.get<Cliente>(`${urlEndPoint}/${id}`, { headers: this.agregarAuthorization() });
  }

  // Actualizar un cliente
  update(cliente:Cliente):Observable<Cliente> {
    return this.http.put<Cliente>(`${urlEndPoint}/editar/${cliente.id}`, cliente, { headers: this.agregarAuthorization() })
  }

  // Eliminar un cliente
  delete(id:number):Observable<Cliente> {
    return this.http.delete<Cliente>(`${urlEndPoint}/eliminar/${id}`, { headers: this.agregarAuthorization() });
  }

  // mostrar las compras del cliente pasando su id
  getComprasCliente(id:number):Observable<Compra[]> {
    return this.http.get<Compra[]>(`${urlEndPoint}/compras/${id}`, { headers: this.agregarAuthorization() });
  }

}
