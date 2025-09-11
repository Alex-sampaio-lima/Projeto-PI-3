import { Component } from '@angular/core';
import { ContainerFormAdminPedidosComponent } from "../admin-pedidos/container-form-admin-pedidos/container-form-admin-pedidos.component";
import { NavBarAdminPedidosComponent } from "../admin-pedidos/nav-bar-admin-pedidos/nav-bar-admin-pedidos.component";
import { ContainerFormAdminEstoqueComponent } from "./container-form-admin-estoque/container-form-admin-estoque.component";
import { ContainerFormEstoqueDashboardComponent } from "./container-form-admin-estoque/container-form-estoque-dashboard/container-form-estoque-dashboard.component";

@Component({
  selector: 'app-admin-estoque',
  imports: [ContainerFormAdminEstoqueComponent, NavBarAdminPedidosComponent],
  templateUrl: './admin-estoque.component.html',
  styleUrl: './admin-estoque.component.css'
})
export class AdminEstoqueComponent {

}
