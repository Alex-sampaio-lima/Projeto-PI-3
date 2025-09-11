import { UserService } from './../../../../services/user.service';
import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule, ViewportScroller } from '@angular/common';


@Component({
  selector: 'app-header',
  imports: [RouterModule, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  public userService = inject(UserService);

  constructor(private router: Router, private viewportScroller: ViewportScroller) { }

  scrollTo(sectionId: string): void {
    const currentUrl = this.router.url.split('#')[0];

    if (currentUrl === '/home') {
      this.viewportScroller.scrollToAnchor(sectionId);
    } else {
      this.router.navigate(['/home'], { fragment: sectionId });
    }
  }


  clickMenu() {
    const titulos: null | HTMLElement = document.getElementById('header-titulos-menu-mobile');
    const btn = document.getElementById('btn-login-menu-mobile');


    if (titulos) {
      titulos.classList.toggle('active');
    };

    if (btn) {
      btn.classList.toggle('active');
    };

  };

  deslogarUsuario() {
    this.userService.logOut();
  };

};

