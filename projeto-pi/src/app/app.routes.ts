  import { ExtraOptions, RouterModule, Routes } from '@angular/router';
  import { HomeComponent } from './components/home/home.component';
  import { LoginComponent } from './components/login/login.component';
  import { AdminPedidosComponent } from './components/admin-pedidos/admin-pedidos.component';
  // import { AdminEstoqueComponent } from './components/admin-estoque/admin-estoque.component';
  import { PaginaNaoEncontradaComponent } from './components/pagina-nao-encontrada/pagina-nao-encontrada.component';
  import { CardSaboresComponent } from './components/home/card-sabores/card-sabores.component';
  import { NgModule } from '@angular/core';
  import { RegisterComponent } from './components/register/register.component';
  import { MatDialogModule } from '@angular/material/dialog';
  import { FormsModule } from '@angular/forms';
  import { BrowserModule } from '@angular/platform-browser';
  import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
  import { HttpClientModule } from '@angular/common/http';
  import { AdminGuardService } from '../services/admin-guard.service';
  import { CommonModule } from '@angular/common';
  import { ToastrModule } from 'ngx-toastr';
  //15.11

  import { HomeCardapioComponent } from './components/home-cardapio/home-cardapio.component';
  import { CarrinhoCompraComponent } from './components/carrinho-compra/carrinho-compra.component';

  export const routes: Routes = [
    { path: "home", component: HomeComponent },
    { path: "home-cardapio", component: HomeCardapioComponent },
    { path: "card", component: CardSaboresComponent },
    { path: "login", component: LoginComponent },
    { path: "register", component: RegisterComponent },
    { path: "admin-pedidos", component: AdminPedidosComponent, canActivate: [AdminGuardService] },
    // { path: "adminEstoque", component: AdminEstoqueComponent, canActivate: [AdminGuardService] },

    { path: "carrinho-compra", component: CarrinhoCompraComponent },

    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "**", component: PaginaNaoEncontradaComponent }
  ];



  const routerOptions: ExtraOptions = {
    anchorScrolling: 'enabled',
    scrollPositionRestoration: 'enabled'
  };

  @NgModule({
    imports: [
      RouterModule.forRoot(routes, routerOptions),
      MatDialogModule,
      FormsModule,
      BrowserModule,
      CommonModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()

    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }
