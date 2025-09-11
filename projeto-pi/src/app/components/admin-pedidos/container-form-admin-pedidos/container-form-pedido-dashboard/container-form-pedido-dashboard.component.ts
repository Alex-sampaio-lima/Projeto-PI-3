import { Component, inject, OnInit } from '@angular/core';
import { Pedido } from '../../../../../interfaces/pedido';
import { PedidoService } from '../../../../../services/pedido.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContainerFormModalPedidoComponent } from '../container-form-modal-pedido/container-form-modal-pedido.component';
import { Cliente } from '../../../../../interfaces/user';
import { ToastrService } from 'ngx-toastr';

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

  constructor(public dialog: MatDialog, public toastr: ToastrService) { }

  clientes: Cliente[] = [];
  pedidos: Pedido[] = [];
  verificaAtualizaPedido = false;
  modalVisible = false;
  termoPesquisa: string = '';

  ngOnInit(): void {
    this.listarPedidos();
  }

  listarPedidos() {
    this.pedidoService.getAllPedidos().subscribe((data: Pedido[]) => {
      this.pedidos = data;
    })
  }

  get filtrarPedidos() {
    const termo = this.termoPesquisa.toLowerCase();

    if (termo !== '') {
      return this.pedidos.filter(pedido => {
        return pedido.nome?.toLowerCase().includes(termo) ||
          pedido.email?.toLowerCase().includes(termo) ||
          pedido.tipo_pedido?.toLowerCase().includes(termo) ||
          pedido.status?.toLowerCase().includes(termo)
      });
    }
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
        console.error('Erro ao excluir pedido', err);
      }
    });
    this.listarPedidos();
  }

  openModal(): void {
    console.log("O modal foi Aberto");
    this.modalVisible = true;
    this.pedidoService.vericaAtualizacaoPedido = false;
  }
}
