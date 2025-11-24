import { Component, inject } from '@angular/core';
import { PedidoService } from '../../../../../services/pedido.service';

@Component({
  selector: 'app-container-header-info-cliente-pedidos',
  imports: [],
  templateUrl: './container-header-info-cliente-pedidos.component.html',
  styleUrl: './container-header-info-cliente-pedidos.component.css'
})
export class ContainerHeaderInfoClientePedidosComponent {

  pedidoService = inject(PedidoService);
};
