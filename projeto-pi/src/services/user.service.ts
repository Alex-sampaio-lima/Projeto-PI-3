import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Cliente, SafeUser, User } from '../interfaces/user';
import { ToastrService } from 'ngx-toastr';


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnInit {

  private userUrl = 'http://localhost:3000/user';
  private isAuthenticated = false;
  userLocalStorage: string | null | void = '';
  users: User[] = [];

  currentUser: Omit<User, 'id' | 'created_at' | 'updated_at'> = {
    nome: '',
    email: '',
    password: '',
    isAdmin: false,
  };

  verifyCurrentUser: Omit<User, 'id' | 'password' | 'created_at' | 'updated_at'> = {
    nome: '',
    email: '',
    isAdmin: false,
  }
  urlUser = ' http://localhost:3000/user';

  constructor(private http: HttpClient, private router: Router, public toastr: ToastrService) { }

  ngOnInit(): void {
    this.isLoggedInAdmin();
    console.log(` Nome do currentUser ${this.currentUser.nome}`);

  }

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
    console.log(`USER COMPLETO: ${userCompleto}`);

    return this.http.post<User>(this.urlUser, userCompleto);
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
      this.toastr.error('Tempo expirado !');
    };

    return item.value;
  };

  login(email: string, password: string): Observable<any> {
    return this.http.get<User[]>(`${this.userUrl}?email=${email}&password=${password}`).pipe(
      tap(users => {
        if (users && users.length > 0) {
          this.isAuthenticated = true;
          this.currentUser = users[0];
          const safeUser = this.sanitizeUser(users[0]);
          this.userLocalStorage = localStorage.setItem('@currentUser', JSON.stringify(safeUser));
          this.setItemWithExpiry("@currentUser", safeUser, 5 * 600 * 1000);
        };
      }),
      catchError(error => {
        this.toastr.error('Erro ao realizar login:', error);
        return of(null); // Esse of aqui, ele cria um Observable para retornar um null em vez de retornar um null diretamente, para seguir o fluxo normal do código
      })
    );
  };

  isLoggedIn(): boolean {
    let verifica = false;
    if (this.isAuthenticated) {
      verifica = true;
    };
    return verifica;
  };

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
      }
      // console.log(`variavel do admin: ${this.verifyCurrentUser.isAdmin}`);

      this.verifyCurrentUser.isAdmin == true ? verifica = true : verifica = false;

      // console.log("Autenticado", this.isAuthenticated);
      // console.log("Usuário atual", this.verifyCurrentUser);
      // console.log("local storage", this.userLocalStorage);

    }
    return verifica;
  };

  logOut(): void {
    this.isAuthenticated = false;
    this.currentUser = {
      nome: '',
      email: '',
      password: '',
      isAdmin: false,
    };
    localStorage.removeItem('@currentUser');
    this.router.navigate(['/home']);
  };

  sanitizeUser(user: User): SafeUser {
    return {
      nome: user.nome,
      email: user.email,
      isAdmin: user.isAdmin,
    }
  }
};


