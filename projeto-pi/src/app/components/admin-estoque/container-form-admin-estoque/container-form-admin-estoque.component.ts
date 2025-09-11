import { Component } from '@angular/core';
import { ContainerInfoEstoqueComponent } from './container-info-estoque/container-info-estoque.component';
import { ContainerFormEstoqueDashboardComponent } from "./container-form-estoque-dashboard/container-form-estoque-dashboard.component";
import { ContainerHeaderInfoPedidosComponent } from "../../admin-pedidos/container-form-admin-pedidos/container-header-info-pedidos/container-header-info-pedidos.component";
import { ContainerHeaderInfoEstoqueComponent } from "./container-header-info-estoque/container-header-info-estoque.component";

@Component({
  selector: 'app-container-form-admin-estoque',
  imports: [ContainerInfoEstoqueComponent,
    ContainerFormEstoqueDashboardComponent,
    ContainerHeaderInfoEstoqueComponent
  ],
  templateUrl: './container-form-admin-estoque.component.html',
  styleUrl: './container-form-admin-estoque.component.css'
})
export class ContainerFormAdminEstoqueComponent {


}
