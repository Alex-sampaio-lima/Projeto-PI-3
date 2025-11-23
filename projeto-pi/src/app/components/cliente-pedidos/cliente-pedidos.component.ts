import { Component } from '@angular/core';
import { NavBarClientePedidosComponent } from "./nav-bar-cliente-pedidos/nav-bar-cliente-pedidos.component";
import { NavBarAdminPedidosComponent } from "../admin-pedidos/nav-bar-admin-pedidos/nav-bar-admin-pedidos.component";
import { ContainerFormAdminPedidosComponent } from "../admin-pedidos/container-form-admin-pedidos/container-form-admin-pedidos.component";

@Component({
  selector: 'app-cliente-pedidos',
  imports: [NavBarAdminPedidosComponent, ContainerFormAdminPedidosComponent, NavBarClientePedidosComponent],
  templateUrl: './cliente-pedidos.component.html',
  styleUrl: './cliente-pedidos.component.css'
})
export class ClientePedidosComponent {

}
