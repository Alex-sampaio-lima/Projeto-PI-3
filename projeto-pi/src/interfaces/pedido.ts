export interface Pedido {
  id: number;
  nome: string,
  telefone: string;
  email: string;
  cpf: string;
  tipo_pedido: string;
  forma_pagamento: string;
  valor_total: number | null;
  status: string;
  observacoes: string;
  cliente_id: number;
  created_at: string;
  updated_at: string;
}


export interface Pedidopayload {
  tipo_pedido: string;
  forma_pagamento: string;
  valor_total: number;
  status: string;
  observacoes: string;
  cliente_id: number;
}


