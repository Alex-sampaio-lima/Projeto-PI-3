import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-container-header-info-estoque',
  imports: [],
  templateUrl: './container-header-info-estoque.component.html',
  styleUrl: './container-header-info-estoque.component.css'
})
export class ContainerHeaderInfoEstoqueComponent implements OnInit {

  userService = inject(UserService);

  userName = '';
  
  ngOnInit(): void {
    this.userName = this.userService.verifyCurrentUser.nome;
  }

}
