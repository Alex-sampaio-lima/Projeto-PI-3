import { Component, inject, OnInit } from '@angular/core';
import { Pedido, PedidoResponse } from '../../../../../interfaces/pedido';
import { PedidoService } from '../../../../../services/pedido.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerFormModalPedidoComponent } from '../container-form-modal-pedido/container-form-modal-pedido.component';
import { Cliente } from '../../../../../interfaces/user';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-container-form-pedido-dashboard',
  imports: [
    HttpClientModule,
    FormsModule,
    CommonModule,
    ContainerFormModalPedidoComponent],
  templateUrl: './container-form-pedido-dashboard.component.html',
  styleUrl: './container-form-pedido-dashboard.component.css'
})

export class ContainerFormPedidoDashBoardComponent implements OnInit {
  private pedidoService = inject(PedidoService);
  private userService = inject(UserService);

  constructor(public dialog: MatDialog, public toastr: ToastrService) { }

  clientes: Cliente[] = [];
  pedidos: PedidoResponse[] = [];
  verificaAtualizaPedido = false;
  modalVisible = false;
  termoPesquisa: string = '';

  ngOnInit(): void {

    this.carregarPedidos();

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
  };

  carregarPedidos() {
    if (this.userService.isLoggedInAdmin()) {
      this.pedidoService.getAllPedidos().subscribe(pedidos => {
        this.pedidos = pedidos;
      });
    } else {
      this.pedidoService.getMeusPedidos().subscribe(pedidos => {
        this.pedidos = pedidos;
      });
    };
  };
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

  formatLocalDate(dateString: string): string {
    if (!dateString) return '';

    // Converte "2024-01-15" para "15/01/2024"
    const [year, month, day] = dateString.split('-');
    return `${day}/${month}/${year}`;
  }

  getType(value: any): string {
    return typeof value;
  }
};
