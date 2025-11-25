import { Component, inject, OnInit } from '@angular/core';
import { NavBarClientePedidosComponent } from "./nav-bar-cliente-pedidos/nav-bar-cliente-pedidos.component";
import { ContainerFormClientePedidosComponent } from "./container-form-cliente-pedidos/container-form-cliente-pedidos.component";
import { PedidoResponse } from '../../../interfaces/pedido';
import { PedidoService } from '../../../services/pedido.service';

@Component({
  selector: 'app-cliente-pedidos',
  imports: [NavBarClientePedidosComponent, ContainerFormClientePedidosComponent],
  templateUrl: './cliente-pedidos.component.html',
  styleUrl: './cliente-pedidos.component.css'
})
export class ClientePedidosComponent implements OnInit {
  pedidoService = inject(PedidoService);

  ngOnInit(): void {
    console.log('✅ ClientePedidosComponent inicializado');

    // Escuta por atualizações de pedidos
    this.pedidoService.pedidosAtualizados$.subscribe((atualizado: boolean) => {
      console.log('📢 Recebida notificação de atualização:', atualizado);
      if (atualizado) {
        // Força atualização nos componentes filhos via Input
        this.atualizarComponentesFilhos();
      }
    });
  }

  atualizarComponentesFilhos(): void {
    console.log('🔄 Atualizando componentes filhos...');
    // Esta função pode ser usada para forçar atualização nos filhos
  }
}
