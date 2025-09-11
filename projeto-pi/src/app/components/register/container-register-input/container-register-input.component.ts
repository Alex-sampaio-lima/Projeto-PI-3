import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Cliente, User } from '../../../../interfaces/user';

@Component({
  selector: 'app-container-register-input',
  imports: [RouterModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './container-register-input.component.html',
  styleUrl: './container-register-input.component.css'
})
export class ContainerRegisterInputComponent implements OnInit {
  constructor(private fb: FormBuilder) { }

  userService = inject(UserService);
  userForm!: FormGroup;
  @Output() userCriado = new EventEmitter<void>();

  ngOnInit() {
    this.userForm = this.fb.group({
      nome: '',
      email: '',
      senha: '',
      cpf: '',
      telefone: ''
    });
  };

  listarUsers() {
    
  };

  criarUser() {
    const novoUser: Omit<Cliente, 'id' | 'created_at' | 'updated_at'> = {
      nome: this.userForm.value.nome,
      email: this.userForm.value.email,
      password: this.userForm.value.senha,
      telefone: this.userForm.value.telefone,
      cpf: this.userForm.value.cpf,
      isAdmin: false,
    };

    console.log(novoUser);
    this.userService.postUser(novoUser).subscribe({
      next: (response) => {
        console.log(`Usuário criado: ${response}`);

      },
      error(e) {
        console.error(`Erro ao criar novo usuário ${e}`);
      }
    });


  };
};
