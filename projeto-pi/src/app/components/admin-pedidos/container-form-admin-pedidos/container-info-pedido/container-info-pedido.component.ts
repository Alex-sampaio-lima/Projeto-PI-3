import { Component, inject } from '@angular/core';
import { PedidoService } from '../../../../../services/pedido.service';

@Component({
  selector: 'app-container-info-pedido',
  imports: [],
  templateUrl: './container-info-pedido.component.html',
  styleUrl: './container-info-pedido.component.css'
})
export class ContainerInfoPedidoComponent {

  pedidoService = inject(PedidoService);

}
