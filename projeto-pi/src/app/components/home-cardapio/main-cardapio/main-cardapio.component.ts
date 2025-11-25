import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { CartService } from '../../../../services/carrinho.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-cardapio.component.html',
  styleUrls: ['./main-cardapio.component.css']
})
export class MainCardapioComponent {

  constructor(
    private authService: AuthService,
    private cartService: CartService,
    private router: Router,
    public toastr: ToastrService
  ) { }




  // ======== LISTA DE BOLOS =========
  bolos = [
    { name: 'Brigadeiro', price: 90, description: 'Brigadeiro: Delicioso doce de chocolate com granulado.', image: 'assets/Bolos/bolo-chocolate-com-morango-2.png', isFlipped: false },
    { name: 'Abacaxi', price: 95, description: 'Abacaxi: Sabor tropical com pedaços da fruta e toque especial de creme.', image: 'assets/Bolos/bolo-abacaxi.png', isFlipped: false },
    { name: 'Prestígio', price: 100, description: 'Prestígio: Combinação clássica de chocolate e coco.', image: 'assets/Bolos/bolo-de-coco.png', isFlipped: false },
    { name: 'Maracujá', price: 110, description: 'Maracujá: Sabor cítrico e refrescante com creme suave.', image: 'assets/Bolos/bolo-maracuja.jpg', isFlipped: false }
  ];

  // ======== LISTA DE Salgados =========
  Salgados = [
    { name: 'Mini Salgado', price: 75, description: 'Mini Salgado: Variedade de mini salgados deliciosos.', image: 'assets/Salgados/mini-Salgados.png', isFlipped: false },
    { name: 'Coxinha', price: 80, description: 'Coxinha: Coxinhas crocantes e recheadas.', image: 'assets/Salgados/coxinha-2.jpg', isFlipped: false },
    { name: 'Kibe', price: 80, description: 'Kibe: Kibes tradicionais e saborosos.', image: 'assets/Salgados/Kibe.png', isFlipped: false },
    { name: 'Pastel', price: 65, description: 'Pastel: Pastéis fresquinhos e recheados.', image: 'assets/Salgados/pastel.png', isFlipped: false }
  ];

  // ======== LISTA DE Kit Festa=========
  kitFesta = [
    { name: 'Namorados', price: 42, description: 'Namorados: Kit especial para casais, com itens românticos.', image: 'assets/KitFesta/kit-namoro.jpg', isFlipped: false },
    { name: 'Decoração', price: 30, description: 'Decoração: Itens para deixar sua festa ainda mais bonita.', image: 'assets/KitFesta/kit-festa-2.png', isFlipped: false },
    { name: 'Aniversario', price: 55, description: 'Aniversario: Kit completo para comemorar aniversários.', image: 'assets/KitFesta/kit-festa-3.png', isFlipped: false },
    { name: 'Festa na Caixa', price: 82, description: 'Festa na Caixa: Tudo que você precisa para uma festa prática e divertida.', image: 'assets/KitFesta/kit-festa-4.png', isFlipped: false },
  ];

  // ======== LISTA DE Doces=========
  doces = [
    { name: 'Finos', price: 12, description: 'Finos:Trufas e bombons sofisticados, com toque gourmet', image: 'assets/Doces/doces-finos.png', isFlipped: false },
    { name: 'Tradicinais', price: 5, description: 'Tradicionais: Brigadeiros e beijinhos que nunca saem de moda.', image: 'assets/Doces/tradicionais.png', isFlipped: false },
    { name: 'Diferentes', price: 10, description: 'Diferentes:Sabores criativos e combinações exclusivas.', image: 'assets/Doces/diferentes.png', isFlipped: false },
    { name: 'Padaria', price: 20, description: 'Padaria:Doces fresquinhos, como sonhos, carolinas e mini tortas.', image: 'assets/Doces/sonho.jpg', isFlipped: false }
  ];

  // ======== MÉTODO PARA FLIPAR APENAS O CARD CORRETO ========
  flipCard(list: any[], index: number) {
    list[index].isFlipped = !list[index].isFlipped;
  };

  // ======== ADICIONA NO CARRINHO ========
  addToCart(produto: any) {
    if (!this.authService.isLoggedIn()) {
      this.toastr.info('Você precisa estar logado para adicionar ao carrinho!');
    };

    // adiciona no cartService local
    this.cartService.addItem({
      id: produto.id,           // id do produto
      nomeProduto: produto.name,
      price: produto.price,
      image: produto.image,     // caminho da imagem do produto
      quantidade: 1,            // quantidade inicial
      status: 'Pendente'        // se você adicionou status
    });

    this.toastr.success(`${produto.name} adicionado ao carrinho!`);

    // opcional: redireciona para o carrinho
    this.router.navigate(['/carrinho-compra']);
  };
};
