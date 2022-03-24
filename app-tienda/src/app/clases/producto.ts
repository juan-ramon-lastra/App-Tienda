import { Compra } from "./compra";

export class Producto {
  id!:number;
  nombre!:string;
  descripcion!:string;
  marca!:string;
  precio!:number;
  compra!:Compra;
}
