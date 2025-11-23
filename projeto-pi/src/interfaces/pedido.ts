export interface Pedido {
  id: number;
  nome: string,
  telefone?: string;
  email: string;
  cpf: string;
  nomeProduto: string;
  formaPagamento: string;
  valorTotal: number | null;
  status: string;
  observacoes: string;
  cliente_id: number;
  created_at: string;
  updated_at: string;

};


export interface Pedidopayload {
  nomeProduto: string;
  formaPagamento: string;
  valorTotal: number;
  status: string;
  observacoes: string;
  cliente_id: number;
};


