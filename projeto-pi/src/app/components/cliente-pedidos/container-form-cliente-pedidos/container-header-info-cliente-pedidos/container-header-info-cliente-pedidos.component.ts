import { Component, inject } from '@angular/core';
import { PedidoService } from '../../../../../services/pedido.service';
import { PedidoResponse } from '../../../../../interfaces/pedido';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-container-header-info-cliente-pedidos',
  imports: [],
  templateUrl: './container-header-info-cliente-pedidos.component.html',
  styleUrl: './container-header-info-cliente-pedidos.component.css'
})
export class ContainerHeaderInfoClientePedidosComponent {
  private pedidoService = inject(PedidoService);
  private userService = inject(UserService);

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
};
