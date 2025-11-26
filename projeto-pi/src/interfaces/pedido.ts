import { Cliente } from "./user";

export interface Pedido {
  id: number;
  nomeProduto: string;
  formaPagamento: string;
  valorTotal: number | null;
  status: string;
  observacoes: string;
  dataPedido: string;
  updated_at: string | Date;
};

export interface Pedidopayload {
  nomeProduto: string;
  formaPagamento: string;
  valorTotal: number;
  status: string;
  observacoes: string;
};


export interface PedidoResponse extends Pedido {
  cliente: Cliente;
};

