import { PedidoResponse } from './../../../../../interfaces/pedido';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PedidoService } from '../../../../../services/pedido.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerFormModalPedidoComponent } from '../../../admin-pedidos/container-form-admin-pedidos/container-form-modal-pedido/container-form-modal-pedido.component';

@Component({
  selector: 'app-container-form-cliente-pedidos-dashboard',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
  ],
  templateUrl: './container-form-cliente-pedidos-dashboard.component.html',
  styleUrl: './container-form-cliente-pedidos-dashboard.component.css'
})
export class ContainerFormClientePedidosDashboardComponent {
  
};
