import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-container-login-input',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule,
  ],
  templateUrl: './container-login-input.component.html',
  styleUrl: './container-login-input.component.css',
})
export class ContainerLoginInputComponent {
  errorMessage: string = '';
  loginForm!: FormGroup;
  private userService = inject(UserService);

  constructor(private router: Router, fb: FormBuilder) {
    this.loginForm = fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    if (!email || !password) {
      this.userService.toastr.warning('Preencha todos os campos');
      return;
    }

    this.userService.login(email, password).subscribe({
      next: (response) => {
        if (response && response.user) {
          // this.userService.toastr.success('Login realizado com sucesso!');

          // console.log('Usuário logado:', response.user);

          console.log('É admin = ', response.user.role?.includes('ADMIN'));
          // Aguarda o toastr mostrar e depois navega
          setTimeout(() => {
            if (response.user.role?.includes('ADMIN')) {
              console.log('Redirecionando para admin-pedidos');
              this.router.navigate(['/admin-pedidos']);
            } else {
              console.log('Redirecionando para cliente-pedidos');
              this.router.navigate(['/cliente-pedidos']);
            }
          }, 100);
          console.log(
            ` Nome do currentUser ${this.userService.currentUser.nome}`
          );
          console.log(
            ` Nome do currentUser ${this.userService.currentUser.senha}`
          );
          // this.userService.isAuthenticated = true;
        } else {
          console.log('Resposta sem usuário:', response);
          this.errorMessage = 'Email ou senha incorretos';
          this.userService.toastr.error(this.errorMessage);
        }
      },
      error: (error) => {
        console.error('Erro no login:', error);

        if (error.error?.message) {
          this.errorMessage = error.error.message;
        } else if (error.status === 401) {
          this.errorMessage = 'Email ou senha incorretos';
        } else if (error.status === 500) {
          this.errorMessage = 'Erro no servidor. Tente novamente.';
        } else {
          this.errorMessage = 'Erro ao realizar login';
        }

        this.userService.toastr.error(this.errorMessage);
        console.log('Email tentado:', email);
        console.log('Senha tentada:', password);
      },
    });
  }
}
