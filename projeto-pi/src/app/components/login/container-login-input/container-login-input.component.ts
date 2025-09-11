import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-container-login-input',
  imports: [
    RouterModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    ToastrModule
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
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  };

  onSubmit() {
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;

    this.userService.login(email, password).subscribe(
      response => {
        if (response && response.length > 0 && email !== '',
          password !== ''
          && email == this.userService.currentUser.email
          && password == this.userService.currentUser.password && this.loginForm.valid) {
          this.router.navigate(['home']);
          this.userService.toastr.success("Login realizado com sucesso !");
          // console.log(`EMAIL DO FORM:${email}`);
          // console.log(`EMAIL DO USUÁRIO ATUAL:${this.userService.currentUser.email}`);

          if (this.userService.currentUser.isAdmin) {
            console.log("Entrou !");
            this.router.navigate(['adminPedidos']);
          } else {
            this.router.navigate(['home']);
          };

        } else {
          console.log("Email", email);
          console.log("Senha", password);
          this.errorMessage = 'Email ou senha incorretos';
          this.userService.toastr.error(this.errorMessage);
          console.log(this.errorMessage);
        };
      },
      error => {
        this.errorMessage = 'Ocorreu um erro durante o login';
        alert(this.errorMessage);
      }
    );
  };
};
