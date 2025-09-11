import { Component } from '@angular/core';
import { ContainerBannerLoginComponent } from './container-banner-login/container-banner-login.component';
import { ContainerLoginInputComponent } from './container-login-input/container-login-input.component';

@Component({
  selector: 'app-login',
  imports: [ContainerBannerLoginComponent, ContainerLoginInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
