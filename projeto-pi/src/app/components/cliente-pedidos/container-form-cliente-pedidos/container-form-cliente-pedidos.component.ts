import { Component, inject } from '@angular/core';
import { ContainerHeaderInfoPedidosComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-header-info-pedidos/container-header-info-pedidos.component";
import { ContainerInfoPedidoComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-info-pedido/container-info-pedido.component";
import { ContainerFormPedidoDashBoardComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-form-pedido-dashboard/container-form-pedido-dashboard.component";
import { PedidoResponse } from '../../../../interfaces/pedido';
import { UserService } from '../../../../services/user.service';
import { PedidoService } from '../../../../services/pedido.service';

@Component({
  selector: 'app-container-form-cliente-pedidos',
  imports: [ContainerHeaderInfoPedidosComponent, ContainerFormPedidoDashBoardComponent],
  templateUrl: './container-form-cliente-pedidos.component.html',
  styleUrl: './container-form-cliente-pedidos.component.css'
})
export class ContainerFormClientePedidosComponent {
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
