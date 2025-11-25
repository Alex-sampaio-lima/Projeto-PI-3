import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, Observable } from 'rxjs';
import { Carrinho } from '../interfaces/carrinho';
import { Pedido, Pedidopayload, PedidoResponse } from '../interfaces/pedido';
import { PedidoService } from './pedido.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/pedido';
  private cart: Carrinho[] = [];
  public pedidoService = inject(PedidoService);
  constructor(private http: HttpClient) { }


  getCart(): Carrinho[] {
    return this.cart;
  };

  addItem(item: Carrinho) {
    this.cart.push(item);
  };

  removeItem(index: number) {
    this.cart.splice(index, 1);
  };

  clearCart() {
    this.cart = [];
  };

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantidade, 0);
  };

  // createPedido(clienteId: number, formaPagamento: string): Observable<any> {
  //   const payload = {
  //     nomeProduto: this.cart.map(i => i.nomeProduto).join(', '),
  //     formaPagamento,
  //     valorTotal: this.getTotal(),
  //     status: 'Pendente',
  //     observacoes: '',
  //     cliente_id: clienteId
  //   };
  //   const headers = this.pedidoService.getAuthHeaders();
  //   return this.http.post(this.baseUrl, payload, { headers: headers });
  // };

  createPedidos(clienteId: number, formaPagamento: string): Observable<any[]> {
    // Verificar se há itens no carrinho
    if (this.cart.length === 0) {
      throw new Error('Carrinho vazio');
    };
    console.log("Carrinho =" + this.cart);

    const requests = this.cart.map(item => {
      // Criar payload conforme interface Pedidopayload
      const payload: Pedidopayload = {
        nomeProduto: item.nomeProduto,
        formaPagamento: formaPagamento,
        valorTotal: item.price * item.quantidade,
        status: 'Pendente',
        observacoes: ''
      };

      console.log('Enviando payload para:', item.nomeProduto, payload);
      this.debugCartItems();

      const headers = this.pedidoService.getAuthHeaders();
      return this.http.post<Pedidopayload>(this.baseUrl, payload, { headers: headers });
    });

    return forkJoin(requests);
  };

  createPedidosIndividual(clienteId: number, formaPagamento: string): Observable<any[]> {
    const requests = this.cart.map(item => {
      const payload = {
        nomeProduto: item.nomeProduto,
        formaPagamento,
        valorTotal: item.price * item.quantidade,
        status: 'Pendente',
        observacoes: '',
        cliente_id: clienteId,
        quantidade: item.quantidade,
      };


      const headers = this.pedidoService.getAuthHeaders();
      return this.http.post(this.baseUrl, payload, { headers });
    });

    return forkJoin(requests); // Executa todas as requisições em paralelo
  };
  // Método para debug detalhado
  debugCartItems(): void {
    console.log('=== DEBUG CARRINHO ===');
    console.log('Número de itens:', this.cart.length);

    this.cart.forEach((item, index) => {
      console.log(`Item ${index + 1}:`, {
        nomeProduto: item.nomeProduto,
        price: item.price,
        quantidade: item.quantidade,
        subtotal: item.price * item.quantidade

      });
    });

    console.log('Total geral:', this.getTotal());
    console.log('=====================');
  };
};
