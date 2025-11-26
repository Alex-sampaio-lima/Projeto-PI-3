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
export class ClientePedidosComponent {

}
