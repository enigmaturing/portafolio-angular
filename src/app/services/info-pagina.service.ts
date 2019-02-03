import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  // info es de tipo interfaz que hemos creado en interfaces/info-pagina.interface.ts
  // (ver Curso gratuito de angular video 27 marcador paso 26)
  info: InfoPagina = {};
  cargada = false;

  constructor( private http: HttpClient) {
    console.log('Servicio de infoPagina listo');

    // Leer archivo JSON data/data-pagina.json
    this.http.get('assets/data/data-pagina.json')
      .subscribe((resp: InfoPagina) => {
        this.info = resp;
        console.log(resp);
        console.log(resp['email']);
      });
    }
}
