import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Carrinho } from '../interfaces/carrinho';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private baseUrl = 'http://localhost:8080/pedido';
  private cart: Carrinho[] = [];

  constructor(private http: HttpClient) {}

  getCart(): Carrinho[] {
    return this.cart;
  }

  addItem(item: Carrinho) {
    this.cart.push(item);
  }

  removeItem(index: number) {
    this.cart.splice(index, 1);
  }

  clearCart() {
    this.cart = [];
  }

  getTotal(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantidade, 0);
  }

  createPedido(clienteId: number, formaPagamento: string): Observable<any> {
    const payload = {
      nomeProduto: this.cart.map(i => i.nomeProduto).join(', '),
      formaPagamento,
      valorTotal: this.getTotal(),
      status: 'Pendente',
      observacoes: '',
      cliente_id: clienteId
    };
    
    return this.http.post(this.baseUrl, payload);
  }
}
