import { Component } from '@angular/core';
import { ContainerHeaderInfoPedidosComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-header-info-pedidos/container-header-info-pedidos.component";
import { ContainerInfoPedidoComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-info-pedido/container-info-pedido.component";
import { ContainerFormPedidoDashBoardComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-form-pedido-dashboard/container-form-pedido-dashboard.component";

@Component({
  selector: 'app-container-form-cliente-pedidos',
  imports: [ContainerHeaderInfoPedidosComponent, ContainerInfoPedidoComponent, ContainerFormPedidoDashBoardComponent],
  templateUrl: './container-form-cliente-pedidos.component.html',
  styleUrl: './container-form-cliente-pedidos.component.css'
})
export class ContainerFormClientePedidosComponent {

}
