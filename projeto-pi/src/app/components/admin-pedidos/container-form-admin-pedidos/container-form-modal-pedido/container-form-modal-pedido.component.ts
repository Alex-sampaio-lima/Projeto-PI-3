import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../../../../services/pedido.service';
import { Pedido, PedidoResponse } from '../../../../../interfaces/pedido';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-container-form-modal-pedido',
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './container-form-modal-pedido.component.html',
  styleUrl: './container-form-modal-pedido.component.css'
})

export class ContainerFormModalPedidoComponent implements OnInit {

  public pedidoService = inject(PedidoService);
  public userService = inject(UserService);

  constructor(public dialogRef: MatDialog, private fb: FormBuilder, public toastr: ToastrService) { }

  pedidoForm!: FormGroup;
  private alteracoesPendentesPedido: Partial<Pedido> = {};
  private dadosOriginaisPedido: Pedido | null = null;

  pedidoData: Pedido[] = [];

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() pedidoCriado = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent | Event) {
    if (this.visible) {
      this.onClose();
    };
  };

  ngOnInit(): void {
    this.pedidoForm = this.fb.group({
      nomeProduto: [''],
      formaPagamento: [''],
      valorTotal: [''],
      status: [''],
      observacoes: [''],
    });
    this.listarPedidos();
  };

  onClose() {
    this.close.emit();
    this.listarPedidos();
  };

  listarPedidos() {
    this.pedidoService.getAllPedidos().subscribe({
      next: (data: PedidoResponse[]) => {
        console.log('📦 Dados recebidos:', data);
        this.pedidoData = data;

        // Debug: verifique um item específico
        if (data.length > 0) {
          console.log('🔍 Primeiro pedido:', data[0]);
          console.log('📅 Created_at do primeiro:', data[0].dataPedido);
          console.log('👤 Cliente do primeiro:', data[0].cliente);
        }
      },
      error: (error) => {
        console.error('❌ Erro ao carregar pedidos:', error);
      }
    });
  };

  listarPedidoPorID() {
    this.pedidoService.getPedidoByID(this.pedidoService.idPedido).subscribe({
      next: (data: any) => {
        this.dadosOriginaisPedido = { ...data };
        this.resetForm();
      },
      error(e) {
        console.error('Erro ao buscar pedido pelo ID', e);
      }
    });
  };

  campoAlterado(campo: keyof Pedido, valor: any) {
    if ((this.dadosOriginaisPedido && this.dadosOriginaisPedido[campo] !== valor) || (this.dadosOriginaisPedido == null)) {
      this.alteracoesPendentesPedido[campo] = valor;
    } else {
      console.log("CAIU NO DELETE");
    };
  };

  limparAlteracoesPendentes() {
    this.alteracoesPendentesPedido = {};
  };

  atualizar() {

    if (this.pedidoService.vericaAtualizacaoPedido) {
      this.pedidoService.updatePedido(this.pedidoService.idPedido, this.alteracoesPendentesPedido).subscribe({
        next: (response) => {
          console.log(`Pedido atualizado com sucesso ! ${response}`);
          this.toastr.success(`Pedido atualizado com sucesso !`);
          this.pedidoCriado.emit();
          this.resetForm();
        },
        error: (e) => {
          console.error(`Erro ao atualizar Estoque ! Erro: ${e}`);
          this.toastr.error("Erro ao atualizar Estoque !")
        }
      });
    };

    this.close.emit();
    this.resetForm();
  };

  criarPedido() {
    const novoPedido: Omit<Pedido, 'id' | 'dataPedido' | 'updated_at'> = {
      nomeProduto: this.pedidoForm.value.nomeProduto,
      formaPagamento: this.pedidoForm.value.formaPagamento,
      valorTotal: this.pedidoForm.value.valorTotal,
      status: this.pedidoForm.value.status,
      observacoes: this.pedidoForm.value.observacoes
    };

    this.pedidoService.postPedido(novoPedido).subscribe({
      next: (response) => {
        this.toastr.success(`Pedido criado com sucesso !`);
        this.pedidoCriado.emit();
        this.listarPedidos();
        this.resetForm();
        // Fecha o Modal ao criar o pedido
        this.onClose();
      },
      error(error) {
        console.error("Erro ao criar pedido", error);
      },
    });
  };


  resetForm() {
    this.pedidoForm.reset({
      nomeProduto: '',
      formaPagamento: '',
      valorTotal: null,
      status: '',
      observacoes: '',
    });
  };
};
