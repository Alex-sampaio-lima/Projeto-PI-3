export interface Estoque {
    id: number;
    nome_produto: string;
    tipo_produto: string;
    quantidade: number | null;
    custo_unitario: number | null;
    unidade_medida: string;
    observacoes: string;
    created_at: string;
    updated_at: string;
}

export interface EstoqueUpdate {
    nome_produto: string;
    tipo_produto: string;
    quantidade: number | null;
    custo_unitario: number | null;
    unidade_medida: string;
    observacoes: string;
}
