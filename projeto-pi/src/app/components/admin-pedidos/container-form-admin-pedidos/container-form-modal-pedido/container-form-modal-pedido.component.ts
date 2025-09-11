import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, HostListener, inject, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PedidoService } from '../../../../../services/pedido.service';
import { Pedido } from '../../../../../interfaces/pedido';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-container-form-modal-pedido',
  imports: [HttpClientModule, FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './container-form-modal-pedido.component.html',
  styleUrl: './container-form-modal-pedido.component.css'
})

export class ContainerFormModalPedidoComponent implements OnInit {

  public pedidoService = inject(PedidoService);

  constructor(public dialogRef: MatDialog, private fb: FormBuilder, public toastr: ToastrService) { }

  pedidoForm!: FormGroup;
  private alteracoesPendentesPedido: Partial<Pedido> = {};
  private dadosOriginaisPedido: Pedido | null = null;

  pedidoData: Pedido[] = [];

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() pedidoCriado = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.visible) {
      this.onClose();
    };
  };

  ngOnInit(): void {
    this.listarPedidos();

    this.pedidoForm = this.fb.group({
      nome: [''],
      telefone: [''],
      email: [''],
      cpf: [''],
      tipo_pedido: [''],
      forma_pagamento: [''],
      valor_total: [''],
      status: [''],
      observacoes: [''],
    });
    console.log(this.pedidoForm.value.nome);
  };

  onClose() {
    this.close.emit();
    this.listarPedidos();
  };

  listarPedidos() {
    this.pedidoService.getAllPedidos().subscribe((data: Pedido[]) => {
      this.pedidoData = data;
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
    const novoPedido: Omit<Pedido, 'id' | 'created_at' | 'updated_at' | 'cliente_id'> = {
      nome: this.pedidoForm.value.nome,
      telefone: this.pedidoForm.value.telefone,
      email: this.pedidoForm.value.email,
      cpf: this.pedidoForm.value.cpf,
      tipo_pedido: this.pedidoForm.value.tipo_pedido,
      forma_pagamento: this.pedidoForm.value.forma_pagamento,
      valor_total: this.pedidoForm.value.valor_total,
      status: this.pedidoForm.value.status,
      observacoes: this.pedidoForm.value.observacoes,
    }

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
      tipo_pedido: '',
      forma_pagamento: '',
      valor_total: null,
      status: '',
      observacoes: '',
    });
  };
};
