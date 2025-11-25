import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { PedidoService } from '../../../../services/pedido.service';
import { PedidoResponse } from '../../../../interfaces/pedido';

@Component({
  selector: 'app-nav-bar-cliente-pedidos',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav-bar-cliente-pedidos.component.html',
  styleUrl: './nav-bar-cliente-pedidos.component.css'
})
export class NavBarClientePedidosComponent implements OnInit {
  pedidoService = inject(PedidoService);
  userService = inject(UserService);

  pedidos: PedidoResponse[] = [];
  isLoading: boolean = true;

  ngOnInit(): void {
    this.carregarMeusPedidos();

    // Escuta por atualizações de pedidos
    this.pedidoService.pedidosAtualizados$.subscribe((atualizado: any) => {
      if (atualizado) {
        this.carregarMeusPedidos();
      }
    });
  }

  carregarMeusPedidos(): void {
    this.isLoading = true;
    this.pedidoService.getMeusPedidos().subscribe({
      next: (pedidos) => {
        this.pedidos = pedidos;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar pedidos:', error);
        this.isLoading = false;
      }
    });
  }

  // Método para forçar atualização (pode ser chamado de outros componentes)
  atualizarLista(): void {
    this.carregarMeusPedidos();
  }
}
