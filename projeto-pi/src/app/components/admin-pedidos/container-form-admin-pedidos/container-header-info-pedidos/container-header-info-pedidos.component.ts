import { Cliente, SafeUser } from '../../../../../interfaces/user';
import { UserService } from './../../../../../services/user.service';
import { Component, inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-container-header-info-pedidos',
  imports: [],
  templateUrl: './container-header-info-pedidos.component.html',
  styleUrl: './container-header-info-pedidos.component.css'
})

export class ContainerHeaderInfoPedidosComponent implements OnInit {

  userService = inject(UserService);

  userName: string = '';

  ngOnInit(): void {
    this.userName = this.userService.verifyCurrentUser.nome;
  }

};
