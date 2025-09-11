import { Pedido } from './../interfaces/pedido';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable, retry, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class PedidoService implements OnInit {

  urlPedido = 'http://localhost:3000/pedidos';
  pedidoForm: FormGroup | undefined;
  idPedido = 0;
  vericaAtualizacaoPedido = false;
  vendidos: number = 0;
  cancelados: number = 0;
  ganhos: number = 0;
  totalGanhos: number = 0;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { };

  ngOnInit(): void {
    this.getAllPedidos();

    this.pedidoForm = this.fb.group({
      tipo_pedido: ['', [Validators.required]],
      forma_pagamento: ['', [Validators.required]],
      valor_total: ['', [Validators.required]],
      status: ['', [Validators.required]],
      observacoes: ['', [Validators.required]]
    });
  };

  verificaVendido(data: Observable<Pedido[]>) {
    data.subscribe(items => {
      this.vendidos = 0;
      this.ganhos = 0;
      this.cancelados = 0;
      items.forEach(item => {
        if (item.status === 'Realizado') {
          this.vendidos++;
        } else if (item.status === 'Cancelado') {
          this.cancelados++;
        };

        if (item.valor_total) {
          this.ganhos += item.valor_total;
          this.totalGanhos = this.ganhos * 0.30;
        };
      });
    });
  };

  getAllPedidos() {
    let data = this.httpClient.get<Pedido[]>(this.urlPedido);
    this.verificaVendido(data);
    return data;
  };

  getPedidoByID(id: number) {
    let data: Observable<Pedido[]>;
    data = this.httpClient.get<Pedido[]>(`${this.urlPedido}/${id}`);
    return data;
  }

  postPedido(pedido: Omit<Pedido, 'id' | 'created_at' | 'updated_at' | 'cliente_id'>): Observable<Pedido> {
    const pedidoCompleto = {
      ...pedido,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString()
    };
    console.log('Payload sendo enviado:', pedidoCompleto);
    return this.httpClient.post<Pedido>(this.urlPedido, pedidoCompleto);
  };

  updatePedido(id: number, pedido: Partial<Pedido>): Observable<Pedido> {
    return this.httpClient.patch<Pedido>(`${this.urlPedido}/${id}`, pedido);
  };
  // updatePedido(id: number, campo: string, valor: number | string): Observable<Pedido> {
  //   const updateData = {
  //     ...this.pedidoForm,
  //     updated_at: new Date().toLocaleString(),
  //     [campo]: valor
  //   };
  //   return this.httpClient.patch<Pedido>(`${this.urlPedido}/${id}`, updateData);
  // };

  deletePedido(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.urlPedido}/${id}`);
  };

};
