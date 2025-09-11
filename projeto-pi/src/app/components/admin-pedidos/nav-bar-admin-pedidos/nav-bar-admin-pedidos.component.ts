import { User } from './../../../../interfaces/user';
import { UserService } from './../../../../services/user.service';
import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-bar-admin-pedidos',
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './nav-bar-admin-pedidos.component.html',
  styleUrl: './nav-bar-admin-pedidos.component.css'
})
export class NavBarAdminPedidosComponent {
  public userService = inject(UserService);
}
