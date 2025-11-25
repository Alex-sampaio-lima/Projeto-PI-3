import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../../services/carrinho.service';
import { Carrinho } from '../../../interfaces/carrinho';
import { FormsModule } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-carrinho-compra',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './carrinho-compra.component.html',
  styleUrls: ['./carrinho-compra.component.css']
})
export class CarrinhoCompraComponent {

  cartItems: Carrinho[] = [];
  cupomDigitado: string = "";
  descontoAplicado: number = 0;

  cuponsValidos: Record<string, number> = {
    'NOTA10': 90,
  };

  constructor(private cartService: CartService, private router: Router, public toastr: ToastrService) {
    this.cartItems = this.cartService.getCart();
  }

  continueShopping() {
    this.router.navigate(['/home-cardapio']);
  }

  removeItem(index: number) {
    this.cartService.removeItem(index);
    this.cartItems = this.cartService.getCart();
  }

  clearCart() {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  aplicarCupom() {
    const cupom = this.cupomDigitado.trim().toUpperCase();
    if (this.cuponsValidos.hasOwnProperty(cupom)) {
      this.descontoAplicado = this.cuponsValidos[cupom];
      this.toastr.success(`Cupom aplicado! ${this.descontoAplicado}% de desconto.`);
    } else {
      this.descontoAplicado = 0;
      this.toastr.error('Cupom inválido ou expirado.');
    }
  }

  getTotalComDesconto(): number {
    const subtotal = this.getTotal();
    return subtotal - (subtotal * (this.descontoAplicado / 100));
  }

  finalizePurchase() {
    const userData = localStorage.getItem("@currentUser");
    if (!userData) {
      console.error('Usuário não logado');
      return;
    }

    const user = JSON.parse(userData);
    const clienteId = user.id; // Ajuste conforme a estrutura do seu localStorage

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
  }
}
