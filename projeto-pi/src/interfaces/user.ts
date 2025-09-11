export interface User {
  id: number;
  nome: string;
  email: string;
  password: string;
  isAdmin: boolean;
  created_at: string;
  updated_at: string;
};

export interface SafeUser {
  email: string;
  nome: string;
  isAdmin: boolean;
};

export interface Cliente extends User {
  telefone: string;
  cpf: string;
};
