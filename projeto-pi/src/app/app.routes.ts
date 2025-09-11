import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AdminPedidosComponent } from './components/admin-pedidos/admin-pedidos.component';
import { AdminEstoqueComponent } from './components/admin-estoque/admin-estoque.component';
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

export const routes: Routes = [
  { path: "home", component: HomeComponent },
  { path: "card", component: CardSaboresComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "adminPedidos", component: AdminPedidosComponent, canActivate: [AdminGuardService] },
  { path: "adminEstoque", component: AdminEstoqueComponent, canActivate: [AdminGuardService] },
  { path: "**", component: PaginaNaoEncontradaComponent },
  { path: "", redirectTo: "/home", pathMatch: "full" }
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
