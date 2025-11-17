import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-main-cardapio',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-cardapio.component.html',
  styleUrls: ['./main-cardapio.component.css']
})
export class MainCardapioComponent {

  // ======== LISTA DE BOLOS =========
  bolos = [
    { name: 'Brigadeiro',price: 90,description:'Brigadeiro: Delicioso doce de chocolate com granulado.', isFlipped: false },
    { name: 'Abacaxi', price: 95,description:'Abacaxi: Sabor tropical com pedaços da fruta e toque especial de creme.', isFlipped: false },
    { name: 'Prestígio', price: 100,description:'Prestígio: Combinação clássica de chocolate e coco.', isFlipped: false },
    { name: 'Maracujá', price: 110,description:'Maracujá: Sabor cítrico e refrescante com creme suave.', isFlipped: false }
  ];

  // ======== LISTA DE Salgados =========
  Salgados = [
    { name: 'Mini Salgado', price: 75,description:'Mini Salgado: Variedade de mini salgados deliciosos.', isFlipped: false },
    { name: 'Coxinha', price: 80,description:'Coxinha: Coxinhas crocantes e recheadas.', isFlipped: false },
    { name: 'Kibe', price: 80,description:'Kibe: Kibes tradicionais e saborosos.', isFlipped: false },
    { name: 'Pastel', price: 65,description:'Pastel: Pastéis fresquinhos e recheados.', isFlipped: false }
  ];

  // ======== LISTA DE Kit Festa=========
  kitFesta= [
    { name: 'Namorados', price: 42,description:'Namorados: Kit especial para casais, com itens românticos.', isFlipped: false },
    { name: 'Decoração', price: 30,description:'Decoração: Itens para deixar sua festa ainda mais bonita.', isFlipped: false },
    { name: 'Aniversario', price: 55,description:'Aniversario: Kit completo para comemorar aniversários.', isFlipped: false },
    { name: 'Festa na Caixa', price: 82,description:'Festa na Caixa: Tudo que você precisa para uma festa prática e divertida.', isFlipped: false },
  ];

  // ======== LISTA DE Doces=========
  doces = [
    { name: 'Finos', price: 12,description: 'Finos:Trufas e bombons sofisticados, com toque gourmet',isFlipped: false },
    { name: 'Tradicinais', price: 5,description:'Tradicionais: Brigadeiros e beijinhos que nunca saem de moda.' ,isFlipped: false },
    { name: 'Diferentes', price: 10,description: 'Diferentes:Sabores criativos e combinações exclusivas.',isFlipped: false },
    { name: 'Padaria', price: 20,description:'Padaria:Doces fresquinhos, como sonhos, carolinas e mini tortas.' ,isFlipped: false }
  ];

  // ======== MÉTODO PARA FLIPAR APENAS O CARD CORRETO ========
  flipCard(list: any[], index: number) {
    list[index].isFlipped = !list[index].isFlipped;
  }

  // ======== CARRINHO (OPCIONAL) ========
  addToCart(produto: any) {
    console.log("Adicionado ao carrinho:", produto);
    // lógica real do carrinho aqui
  }

}
