import { Component } from '@angular/core';
import { NavBarAdminPedidosComponent } from "./nav-bar-admin-pedidos/nav-bar-admin-pedidos.component";
import { ContainerFormAdminPedidosComponent } from "./container-form-admin-pedidos/container-form-admin-pedidos.component";
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-admin-pedidos',
  imports: [NavBarAdminPedidosComponent, ContainerFormAdminPedidosComponent, MatDialogModule],
  templateUrl: './admin-pedidos.component.html',
  styleUrl: './admin-pedidos.component.css'
})
export class AdminPedidosComponent {

}
