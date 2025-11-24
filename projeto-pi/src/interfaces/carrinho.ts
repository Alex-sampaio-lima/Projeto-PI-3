export interface Carrinho {
  id: number;
  nomeProduto: string;  // nome do produto
  price: number;        // preço
  image: string;        // caminho da imagem
  quantidade: number; 
  status: string;  // quantidade adicionada
}
