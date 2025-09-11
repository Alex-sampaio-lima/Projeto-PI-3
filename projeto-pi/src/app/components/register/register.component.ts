import { Component } from '@angular/core';
import { ContainerBannerLoginComponent } from "../login/container-banner-login/container-banner-login.component";
import { ContainerRegisterInputComponent } from "./container-register-input/container-register-input.component";

@Component({
  selector: 'app-register',
  imports: [ContainerBannerLoginComponent, ContainerRegisterInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

}
