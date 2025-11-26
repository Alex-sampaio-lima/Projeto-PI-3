import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { UserService } from './user.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardService implements CanActivate {

  constructor(private userService: UserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {

    //Não está logado → Vai para login
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    }

    // Está logado e é Admin → Acesso liberado
    if (this.userService.isLoggedInAdmin()) {
      return true;
    }

    //Está logado, mas NÃO é admin → Vai para página do cliente
    this.router.navigate(['/cliente-pedidos']);
    return false;
  }

}
