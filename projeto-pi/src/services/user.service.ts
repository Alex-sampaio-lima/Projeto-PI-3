import { LoginRequest, User } from './../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, inject, Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Cliente, SafeUser } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { PedidoService } from './pedido.service';


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private userUrl = 'http://localhost:8080/cliente';
  urlUser = 'http://localhost:8080/cliente';
  urlAuth = 'http://localhost:8080/auth'

  isAdmin = false;
  isAuthenticated = false;
  userLocalStorage: string | null | void = '';
  users: User[] = [];

  currentUser: Omit<User, 'id' | 'created_at' | 'updated_at'> = {
    nome: '',
    email: '',
    senha: '',
    isAdmin: false,
  };

  verifyCurrentUser: Omit<User, 'id' | 'senha' | 'created_at' | 'updated_at'> = {
    nome: '',
    email: '',
    isAdmin: false,
  }

  constructor(private http: HttpClient, private router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedInAdmin();
    console.log(` Nome do currentUser ${this.currentUser.nome}`);
    console.log(` Senha do currentUser ${this.currentUser.senha}`);

  }

  // CRUD - Clientes
  getAllClientes() {
    return this.http.get<Cliente[]>(this.urlUser);
  };

  postUser(user: Omit<User, 'id' | 'isAdmin' | 'created_at' | 'updated_at'>) {
    const userCompleto = {
      ...user,
      created_at: new Date().toLocaleString(),
      updated_at: new Date().toLocaleString(),
      isAdmin: false
    };

    console.log(`USER COMPLETO: ${userCompleto.senha}`);
    this.currentUser.senha = userCompleto.senha
    console.log(`CURRENT USER: ${userCompleto.senha}`);
    return this.http.post<User>(`${this.urlUser}/registrar`, userCompleto);
  };

  setItemWithExpiry(key: string, value: SafeUser, ttl: number) {
    const now = new Date();
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    };

    localStorage.setItem(key, JSON.stringify(item));
  };

  getItemWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key);

    if (!itemStr) {
      return null;
    };

    const item = JSON.parse(itemStr);
    const now = new Date();

    if (now.getTime() > item.expiry) {
      this.isAuthenticated = false;
      this.logOut();
      this.toastr.error('Sessão expirada !');
      return null;
    };

    return item.value;
  };

  login(email: string, password: string): Observable<any> {
    const loginRequest: LoginRequest = {
      email: email,
      senha: password
    };

    return this.http.post<any>(`${this.urlAuth}/login`, loginRequest).pipe(
      tap(response => {
        console.log('Resposta completa da API:', response);

        // CORRIGIDO: Verifica response.user (OBJETO) em vez de response.length (ARRAY)
        if (response && response.user) {
          this.isAuthenticated = true;
          console.log('Está autenticado:', this.isAuthenticated);

          // Calcula se é admin
          this.isAdmin = response.user.role === 'ADMIN' || response.user.role === 'ROLE_ADMIN';

          console.log('Role do usuário:', response.user.role);
          console.log('É admin?', this.isAdmin);

          // Atualiza o currentUser
          this.currentUser = {
            nome: response.user.nome,
            email: response.user.email,
            senha: password,
            isAdmin: this.isAdmin
          };

          // Cria safeUser para localStorage
          const user: any = {
            nome: response.user.nome,
            email: response.user.email,
            senha: password,
            isAdmin: this.isAdmin
          };

          // Salva no localStorage
          localStorage.setItem('@currentUser', JSON.stringify(user));
          this.setItemWithExpiry("@currentUser", user, 5 * 60 * 60 * 1000);

          this.toastr.success('Login realizado com sucesso!');
          console.log('Usuário salvo no localStorage:', user);

        } else {
          console.log('Resposta sem user:', response);
        }
      }),
      catchError(error => {
        console.error('Erro no login:', error);
        this.toastr.error('Erro ao realizar login');
        return of(null);
      })
    );
  }

  isLoggedIn(): boolean {
    const storedUser = this.getItemWithExpiry('@currentUser');

    if (storedUser) {
      this.isAuthenticated = true;
      return true;
    }

    this.isAuthenticated = false;
    return false;
  }

  isLoggedInAdmin(): boolean {
    this.userLocalStorage = localStorage.getItem('@currentUser');
    const storedUser = this.getItemWithExpiry('@currentUser');
    let verifica = false;

    if (this.userLocalStorage) {
      if (storedUser) {
        this.verifyCurrentUser = {
          nome: storedUser.nome,
          email: storedUser.email,
          isAdmin: storedUser.isAdmin
        };
      };
      // console.log(`variavel do admin: ${this.verifyCurrentUser.isAdmin}`);

      this.verifyCurrentUser.isAdmin == true ? verifica = true : verifica = false;

      // console.log("Autenticado", this.isAuthenticated);
      // console.log("Usuário atual", this.verifyCurrentUser);
      // console.log("local storage", this.userLocalStorage);
    };
    return verifica;
  };

  logOut(): void {
    this.isAuthenticated = false;
    this.currentUser = {
      nome: '',
      email: '',
      senha: '',
      isAdmin: false,
    };
    localStorage.removeItem('@currentUser');
    this.router.navigate(['/home']);
    this.toastr.info('Logout realizado com sucesso !');
  };

  sanitizeUser(user: User): SafeUser {
    return {
      nome: user.nome,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }
};


