import { Injectable } from '@angular/core';
import { HttpClient, HttpParams  } from '@angular/common/http';
import { PaginaCliente } from 'src/app/components/model/PaginaCliente';
import { Observable } from 'rxjs';
import { Cliente } from 'src/app/components/model/Cliente';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  
  private enderecoApi: string = "http://127.0.0.1:8080/testemkdata/api-v1/cliente";

  constructor(private httpClient: HttpClient) {}

  salverCliente(cliente: Cliente): Observable<Cliente>{
    return this.httpClient.post<Cliente>(`${this.enderecoApi}`, cliente);
  }

  getClientesPaginado(page: number, size: number): Observable<PaginaCliente>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size);

    return this.httpClient.get<PaginaCliente>(`${this.enderecoApi}/all?${params.toString()}`);
  }

  getClientesPorFiltro(page: number, size: number, nome: string, isAtivo: boolean): Observable<PaginaCliente>{
    const params = new HttpParams()
    .set('page', page)
    .set('size', size)
    .set('nome', nome)
    .set('isAtivo', isAtivo);

    return this.httpClient.get<PaginaCliente>(`${this.enderecoApi}/filter?${params.toString()}`);
  }

  getClientePorId(id: number): Observable<Cliente>{
    return this.httpClient.get<Cliente>(`${this.enderecoApi}/${id}`);
  }

  deletarClientePorId(id: number){
    console.log("Entrou no delete service: id=" + id);
    console.log(`${this.enderecoApi}/${id}`)
    return this.httpClient.delete<any>(`${this.enderecoApi}/${id}`)
  }

  atualizarCliente(cliente: Cliente){
    return this.httpClient.put<any>(`${this.enderecoApi}/${cliente.id}`, cliente)
  }
}
