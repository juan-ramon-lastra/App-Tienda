import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Producto } from '../clases/producto';
import { AuthService } from '../usuarios/auth.service';

const urlEndPoint:string = "http://localhost:9090/api/productos";

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

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

  // Mostrar todos los productos
  getproductos():Observable<Producto[]> {
    return this.http.get(urlEndPoint).pipe(
      map( (response) => response as Producto[] )
    );
  }

  // Crear un nuevo producto
  create(producto:Producto):Observable<Producto> {
    return this.http.post<Producto>(`${urlEndPoint}/nuevo`, producto, { headers: this.agregarAuthorization() });
  }

  // Obtener un producto por su ID
  getProducto(id:number):Observable<Producto> {
    return this.http.get<Producto>(`${urlEndPoint}/${id}`, { headers: this.agregarAuthorization() });
  }

  // Actualizar un producto
  update(producto:Producto):Observable<Producto> {
    return this.http.put<Producto>(`${urlEndPoint}/editar/${producto.id}`, producto, { headers: this.agregarAuthorization() })
  }

  // Eliminar un producto
  delete(id:number):Observable<Producto> {
    return this.http.delete<Producto>(`${urlEndPoint}/eliminar/${id}`, { headers: this.agregarAuthorization() });
  }

}
