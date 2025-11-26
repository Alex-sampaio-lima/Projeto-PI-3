import { User, Cliente } from './../interfaces/user';
import { UserService } from './user.service';
import { Pedido, PedidoResponse } from './../interfaces/pedido';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, retry, tap } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class PedidoService implements OnInit {

  urlPedido = 'http://localhost:8080/pedido';
  pedidoForm: FormGroup | undefined;
  idPedido = 0;
  vericaAtualizacaoPedido = false;
  vendidos: number = 0;
  cancelados: number = 0;
  ganhos: number = 0;
  totalGanhos: number = 0;

  public userService = inject(UserService);
  // pedidosAtualizados$: any;

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder
  ) { };

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      nomeProduto: ['', [Validators.required]],
      formaPagamento: ['', [Validators.required]],
      valorTotal: ['', [Validators.required]],
      status: ['', [Validators.required]],
      observacoes: ['', [Validators.required]]
    });
  };

  // BehaviorSubject para notificar atualizações - VERIFIQUE SE EXISTE
  private pedidosAtualizadosSource = new BehaviorSubject<boolean>(false);
  public pedidosAtualizados$ = this.pedidosAtualizadosSource.asObservable();

  notificarAtualizacaoPedidos(): void {
    console.log('🔄 Notificando atualização de pedidos...');
    this.pedidosAtualizadosSource.next(true);
  };

  public getAuthHeaders(): HttpHeaders {
    const userData = localStorage.getItem("@currentUser");
    if (userData) {
      console.log("Entrou" + JSON.parse(userData));
      var user = JSON.parse(userData);
      var userInfo = { ...user }
    };

    const nomeUsuario = userInfo.value.email;
    const senha = userInfo.value.senha;

    // console.log("USER = " + nomeUsuario);
    // console.log("PASSWORD = " + senha);

    const auth = btoa(`${nomeUsuario}:${senha}`);
    return new HttpHeaders({
      'Authorization': `Basic ${auth}`,
      'Content-Type': 'application/json'
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

        if (item.valorTotal) {
          this.ganhos += item.valorTotal;
          this.totalGanhos = this.ganhos * 0.30;
        };
      });
    });
  };

  // PEDIDO - CLIENTE
  getMeusPedidos(): Observable<PedidoResponse[]> {
    const headers = this.getAuthHeaders();
    return this.httpClient.get<PedidoResponse[]>(`${this.urlPedido}/meus-pedidos`, { headers: headers });
  };

  // CRUD - PEDIDO
  getAllPedidos() {
    const headers = this.getAuthHeaders();
    let data = this.httpClient.get<PedidoResponse[]>(this.urlPedido, { headers: headers });
    this.verificaVendido(data);
    return data;
  };

  getPedidoByID(id: number): Observable<Pedido[]> {
    const headers = this.getAuthHeaders();
    let data: Observable<Pedido[]>;
    data = this.httpClient.get<Pedido[]>(`${this.urlPedido}/${id}`, { headers: headers });
    return data;
  }

  postPedido(pedido: Omit<Pedido, 'id' | 'dataPedido' | 'updated_at' | 'cliente_id'>): Observable<Pedido> {
    const pedidoCompleto = {
      ...pedido
    };

    console.log('Payload sendo enviado:', pedidoCompleto);

    const headers = this.getAuthHeaders();
    return this.httpClient.post<Pedido>(this.urlPedido, pedidoCompleto, { headers: headers });
  };

  updatePedido(id: number, pedido: Partial<Pedido>): Observable<Pedido> {
    const headers = this.getAuthHeaders();
    return this.httpClient.put<Pedido>(`${this.urlPedido}/${id}`, pedido, { headers: headers });
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
    const headers = this.getAuthHeaders();
    return this.httpClient.delete<void>(`${this.urlPedido}/${id}`, { headers: headers });
  };
};
