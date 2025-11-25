import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/carrinho.service';
import { Carrinho } from '../../../interfaces/carrinho';

@Component({
  selector: 'app-carrinho-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrinho-compra.component.html',
  styleUrls: ['./carrinho-compra.component.css']
})
export class CarrinhoCompraComponent {

  cartItems: Carrinho[] = [];

  constructor(private cartService: CartService, private router: Router) {
    this.cartItems = this.cartService.getCart();
  }

  continueShopping() {
    this.router.navigate(['/home-cardapio']);
  };

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCart();
  };

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  };

  getTotal(): number {
    return this.cartService.getTotal();
  };

  finalizePurchase() {
    const userData = localStorage.getItem("@currentUser");
    if (!userData) {
      console.error('Usuário não logado');
      return;
    }

    const user = JSON.parse(userData);
    const userInfo = { ...user };
    const clienteId = userInfo.value.id;

    // Opção 1: Criar múltiplos pedidos de uma vez
    this.cartService.createPedidos(clienteId, 'Cartão').subscribe({
      next: (res: any) => {
        console.log('Pedidos criados:', res);
        this.clearCart();
        this.router.navigate(['/cliente-pedidos']);
      },
      error: (err: any) => {
        console.error('Erro ao criar pedidos:', err);
      }
    });
  };
};
