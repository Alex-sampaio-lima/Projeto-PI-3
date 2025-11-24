import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-nav-bar-cliente-pedidos',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav-bar-cliente-pedidos.component.html',
  styleUrl: './nav-bar-cliente-pedidos.component.css'
})
export class NavBarClientePedidosComponent {
  public userService = inject(UserService);
}
