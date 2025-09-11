import { Component, Inject, inject, OnInit } from '@angular/core';
import { ContainerFormModalEstoqueComponent } from '../container-form-modal-estoque/container-form-modal-estoque.component';
import { Estoque } from '../../../../../interfaces/estoque';
import { EstoqueService } from '../../../../../services/estoque.service';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-container-form-estoque-dashboard',
  imports: [ContainerFormModalEstoqueComponent, FormsModule],
  templateUrl: './container-form-estoque-dashboard.component.html',
  styleUrl: './container-form-estoque-dashboard.component.css'
})
export class ContainerFormEstoqueDashboardComponent implements OnInit {

  public estoqueService = inject(EstoqueService);
  public userService = inject(UserService);
  modalVisible = false;
  estoqueData: Estoque[] = [];
  itensEmEstoque: number = 0;
  dataFormatada: string | undefined;
  termoPesquisa: string = '';

  ngOnInit(): void {
    this.listarEstoque();
  };

  openModal() {
    this.modalVisible = true;
    this.estoqueService.verificaAtualizacaoEstoque = false;
  };

  get filtraEstoque() {
    const termo = this.termoPesquisa;
    if (termo !== '') {
      return this.estoqueData.filter(estoque => {
        return estoque.nome_produto.toLowerCase().includes(termo) ||
          estoque.tipo_produto.toLowerCase().includes(termo) ||
          estoque.quantidade?.toString().includes(termo) ||
          estoque.custo_unitario?.toString().includes(termo) ||
          estoque.observacoes?.toString().includes(termo)
      });
    }
    return this.estoqueData;
  };

  listarEstoque(): void {
    this.estoqueService.getAllEstoque().subscribe((data: Estoque[]) => {
      this.estoqueData = data;
      data.forEach(item => {
        const dataObj = new Date(item.created_at);
        this.dataFormatada = dataObj.toLocaleString('pt-BR');
      })
    });
  };

  excluirEstoque(id: number): void {
    this.estoqueService.deletePedido(id).subscribe({
      next: () => {
        this.userService.toastr.success("Item do Estoque excluido com sucesso !");
        this.listarEstoque();
      },
      error(e) {
        console.log(`Erro ao excluir o pedido ${e}`);
      }
    });
  };

  verificarAtualizacaoEstoqueForm(id: number) {
    this.estoqueService.verificaAtualizacaoEstoque = true;
    this.modalVisible = true;
    this.estoqueService.idEstoque = id;
  };
};
