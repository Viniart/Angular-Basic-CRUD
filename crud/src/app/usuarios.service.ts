import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// CRUD de Usuário
export class UsuariosService {

  private url = 'http://localhost:3000'

  // Serviço - Qualquer funcionalidade

  // O que meu componente precisa
  constructor(private http: HttpClient) { }

  // Elemento que permite que eu verifique mudanças
  getUsuarios() : Observable<any> {
    return this.http.get(`${this.url}/usuarios`)
  }

  postUsuarios(dados: any): Observable<any> {
    return this.http.post(`${this.url}/usuarios`, dados)
  }

  // GET - Pega dados
  // POST - Cadastra dados
  // PUT e o PATCH - Atualizam dados
  // DELETE - Deleta
}
