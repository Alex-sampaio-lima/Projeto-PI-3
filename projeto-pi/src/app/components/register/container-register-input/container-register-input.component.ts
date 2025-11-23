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
    const senha = this.userForm.value.senha;
    if (!senha) {
      console.error('Senha é obrigatória');
      return;
    }
    const telefoneLimpo = this.userForm.value.telefone?.replace(/\s/g, '') || '';

    const novoUser: Omit<Cliente, 'id' | 'created_at' | 'updated_at'> = {
      nome: this.userForm.value.nome,
      email: this.userForm.value.email,
      senha: this.userForm.value.senha,
      telefone: telefoneLimpo,
      cpf: this.userForm.value.cpf?.replace(/\D/g, ''),
      isAdmin: false,
    };

    // Validação básica antes de enviar
    if (!novoUser.nome || !novoUser.email || !novoUser.senha) {
      console.error('Dados incompletos');
      return;
    }

    this.userService.postUser(novoUser).subscribe({
      next: (response) => {
        console.log('Usuário criado:', response);
      },
      error: (e) => {
        console.error('Erro ao criar novo usuário:', e);
        // Log mais detalhado do erro
        if (e.error) {
          console.error('Detalhes do erro:', e.error);
        }
      }
    });
  };
};
