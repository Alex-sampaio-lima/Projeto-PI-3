import { PedidoResponse } from './../../../../../interfaces/pedido';
import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { PedidoService } from '../../../../../services/pedido.service';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from '../../../../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerFormModalPedidoComponent } from '../../../admin-pedidos/container-form-admin-pedidos/container-form-modal-pedido/container-form-modal-pedido.component';

@Component({
  selector: 'app-container-form-cliente-pedidos-dashboard',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ],
  templateUrl: './container-form-cliente-pedidos-dashboard.component.html',
  styleUrl: './container-form-cliente-pedidos-dashboard.component.css'
})
export class ContainerFormClientePedidosDashboardComponent {
  private pedidoService = inject(PedidoService);

  constructor(public dialog: MatDialog, public toastr: ToastrService) { }

  clientes: Cliente[] = [];
  pedidos: PedidoResponse[] = [];
  verificaAtualizaPedido = false;
  modalVisible = false;
  termoPesquisa: string = '';

  ngOnInit(): void {
    this.listarPedidos();
    this.listarMeusPedidos();
  };


  listarPedidos() {
    this.pedidoService.getAllPedidos().subscribe((data: PedidoResponse[]) => {
      this.pedidos = data;
    });
  };

  listarMeusPedidos() {
    this.pedidoService.getMeusPedidos().subscribe((data: PedidoResponse[]) => {
      this.pedidos = data
    });
  }

  get filtrarPedidos() {
    const termo = this.termoPesquisa.toLowerCase();

    if (termo !== '') {
      return this.pedidos.filter(pedido => {
        return pedido.cliente.nome?.toLowerCase().includes(termo) ||
          pedido.cliente.email?.toLowerCase().includes(termo) ||
          pedido.nomeProduto?.toLowerCase().includes(termo) ||
          pedido.status?.toLowerCase().includes(termo)
      });
    };
    return this.pedidos;
  };

  verificarAtualizacaoPedidoForm(id: number): boolean {
    this.pedidoService.idPedido = id;
    this.openModal();
    this.pedidoService.vericaAtualizacaoPedido = true;
    return this.pedidoService.vericaAtualizacaoPedido;
  };

  excluirPedido(id: number): void {
    this.pedidoService.deletePedido(id).subscribe({
      next: () => {
        this.toastr.success('Pedido excluido com sucesso !');
        this.listarPedidos();
      },
      error: (err) => {
        this.toastr.error('Erro ao excluir Pedido !', err);
        console.error('Erro ao excluir pedido', err);
      }
    });
    this.listarPedidos();
  };

  openModal(): void {
    console.log("O modal foi Aberto");
    this.modalVisible = true;
    this.pedidoService.vericaAtualizacaoPedido = false;
  };
};
