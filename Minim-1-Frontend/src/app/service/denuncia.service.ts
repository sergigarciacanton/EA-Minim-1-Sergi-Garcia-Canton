import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Denuncia } from '../models/denuncia';

@Injectable({
  providedIn: 'root',
})
export class DenunciaService {
  url = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  getDenuncias(): Observable<Denuncia[]> {
    return this.http.get<Denuncia[]>(this.url + '/denuncias');
  }

  deleteDenuncia(name: string): Observable<string> {
    return this.http.delete(this.url + '/denuncias/' + name, {
      responseType: 'text',
    });
  }

  addDenuncia(denuncia: Denuncia): Observable<string> {
    return this.http.post(this.url + '/denuncias', denuncia, {
      responseType: 'text',
    });
  }
}
