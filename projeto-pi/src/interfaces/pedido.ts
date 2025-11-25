import { Cliente } from "./user";

export interface Pedido {
  id: number;
  nomeProduto: string;
  formaPagamento: string;
  valorTotal: number | null;
  status: string;
  observacoes: string;
  created_at: string;
  updated_at: string;
};

export interface Pedidopayload {
  nomeProduto: string;
  formaPagamento: string;
  valorTotal: number;
  status: string;
  observacoes: string;
  // cliente_id: number;
};


export interface PedidoResponse extends Pedido {
  cliente: Cliente;
};

