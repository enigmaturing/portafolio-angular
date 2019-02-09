import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor(private http: HttpClient) {
    this.cargarProductos();
   }

  private cargarProductos() {

    return new Promise((resolve, reject) => {
      this.http.get('https://angular-html-8837f.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
          this.productos = resp;
          this.cargando = false;
          resolve();
      });
    });
  }

  getProducto(id: string) {
     return this.http.get(`https://angular-html-8837f.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto(termino: string) {

    if (this.productos.length === 0) {
      // esperar a que se cargen los productos, porque aun no hay productos en el array porductos
      this.cargarProductos().then( () => {
        // esto se ejecuta después de tener los procutos
        // aplicar flitro
        this.filtrarProducots(termino);

      });
    } else {
      // aplicar el filtro, porque ya hay productos en el array porductos
      this.filtrarProducots(termino);
    }
  }

  private filtrarProducots( termino: string ) {
    this.productosFiltrado = [];
    console.log(this.productos);

    termino = termino.toLocaleLowerCase();

    this.productos.forEach(prod => {

      const tituloLower = prod.titulo.toLocaleLowerCase();

      if (prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0) {
          this.productosFiltrado.push(prod);
      }
    });
  }

}
