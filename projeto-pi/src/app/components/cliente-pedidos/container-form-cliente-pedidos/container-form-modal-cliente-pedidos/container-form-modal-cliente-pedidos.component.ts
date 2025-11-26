import { Component, EventEmitter, HostListener, inject, Input, Output } from '@angular/core';
import { Pedido } from '../../../../../interfaces/pedido';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../../../../services/pedido.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-container-form-modal-cliente-pedidos',
  imports: [],
  templateUrl: './container-form-modal-cliente-pedidos.component.html',
  styleUrl: './container-form-modal-cliente-pedidos.component.css'
})
export class ContainerFormModalClientePedidosComponent {

}
