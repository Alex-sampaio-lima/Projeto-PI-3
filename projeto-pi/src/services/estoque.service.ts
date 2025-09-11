import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Estoque } from '../interfaces/estoque';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstoqueService {

  constructor(private httpClient: HttpClient) { }
  urlEstoque = 'http://localhost:3000/estoque'
  verificaAtualizacaoEstoque = false;
  idEstoque: number = 0;
  itensEmEstoque: Array<Estoque> = [];
  itensEmBaixoEstoque: Array<Estoque> = [];
  custoTotal: number = 0;
  // esteMes: Array<Estoque> = [];
  esteMes: number = 0;

  verificarItensEstoque(data: Observable<Estoque[]>) {
    data.subscribe(dataEstoque => {
      this.itensEmEstoque = dataEstoque.filter((item) => item.id != 0);
      // console.log(this.itensEmEstoque.length);
    });
  };

  verificarItensBaixoEstoque(data: Observable<Estoque[]>) {
    data.subscribe(dataEstoque => {
      this.itensEmBaixoEstoque = dataEstoque.filter(item => item.quantidade !== null && item.quantidade <= 5);
      // console.info(this.itensEmBaixoEstoque);
    });
  };

  verificarCustoTotal(data: Observable<Estoque[]>) {
    data.subscribe(dataEstoque => {
      this.custoTotal = 0;
      dataEstoque.forEach(item => {
        if (item.quantidade != null && item.custo_unitario) {
          this.custoTotal += item.quantidade * item.custo_unitario;
        };
      });
    });
  };

  verificaEsteMes(data: Observable<Estoque[]>) {
    let hoje = new Date();
    let dataCriacao: Date;

    data.subscribe(dataEstoque => {
      this.esteMes = 0;
      dataEstoque.forEach(item => {
        dataCriacao = new Date(item.created_at);
        if (dataCriacao.getMonth == hoje.getMonth) {
          this.esteMes += 1;
        }
      })
    });
  };

  getAllEstoque() {
    let data: Observable<Estoque[]>;
    data = this.httpClient.get<Estoque[]>(this.urlEstoque);
    this.verificarItensEstoque(data);
    this.verificarItensBaixoEstoque(data);
    this.verificarCustoTotal(data);
    this.verificaEsteMes(data);
    return data;
  };

  getEstoqueByID(id: number) {
    let data: Observable<Estoque[]>;
    data = this.httpClient.get<Estoque[]>(`${this.urlEstoque}/${id}`);
    return data;
  };

  postEstoque(estoque: Omit<Estoque, 'id' | 'created_at' | 'updated_at'>): Observable<Estoque> {
    const estoqueCompleto = {
      ...estoque,
      created_at: new Date(),
      updated_at: new Date()
    };
    console.log('Payload sendo enviado:', estoqueCompleto);
    return this.httpClient.post<Estoque>(this.urlEstoque, estoqueCompleto);
  };

  updateEstoque(id: number, estoque: Partial<Estoque>): Observable<Estoque> {
    return this.httpClient.patch<Estoque>(`${this.urlEstoque}/${id}`, estoque);
  };

  // updateEstoque(id: number, campo: string, valor: number): Observable<Estoque> {
  //   const updateData = {
  //     ...this.estoqueForm,
  //     updated_at: new Date().toLocaleString(),
  //     [campo]: valor
  //   }
  //   return this.httpClient.patch<Estoque>(`${this.urlEstoque}/${id}`, updateData);
  // };


  deletePedido(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlEstoque}/${id}`);
  };
};
