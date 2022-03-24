import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Compra } from '../clases/compra';
import { Producto } from '../clases/producto';
import { AuthService } from '../usuarios/auth.service';

const urlEndPoint:string = "http://localhost:9090/api/compras";

@Injectable({
  providedIn: 'root'
})
export class CompraService {

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

  // Mostrar todas las compras
  getCompras():Observable<Compra[]> {
    return this.http.get(urlEndPoint).pipe(
      map( (response) => response as Compra[] )
    );
  }

  // Crear una nueva compra
  create(compra:Compra):Observable<Compra> {
    return this.http.post<Compra>(`${urlEndPoint}/nueva`, compra, { headers: this.agregarAuthorization() });
  }

  // Obtener una compra por su ID
  getCompra(id:number):Observable<Compra> {
    return this.http.get<Compra>(`${urlEndPoint}/${id}`, { headers: this.agregarAuthorization() });
  }

  // Actualizar una compra
  update(compra:Compra):Observable<Compra> {
    return this.http.put<Compra>(`${urlEndPoint}/editar/${compra.id}`, compra, { headers: this.agregarAuthorization() })
  }

  // Eliminar una compra
  delete(id:number):Observable<Compra> {
    return this.http.delete<Compra>(`${urlEndPoint}/eliminar/${id}`, { headers: this.agregarAuthorization() });
  }

  // mostrar los productos de la compra pasando su id
  getProductosCompra(id:number):Observable<Producto[]> {
    return this.http.get<Producto[]>(`${urlEndPoint}/productos/${id}`, { headers: this.agregarAuthorization() });
  }

}

