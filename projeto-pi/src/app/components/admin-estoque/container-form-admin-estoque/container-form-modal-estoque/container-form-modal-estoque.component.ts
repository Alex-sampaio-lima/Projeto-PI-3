import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Estoque, EstoqueUpdate } from '../../../../../interfaces/estoque';
import { EstoqueService } from '../../../../../services/estoque.service';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-container-modal-form-estoque',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './container-form-modal-estoque.component.html',
  styleUrl: './container-form-modal-estoque.component.css',
})
export class ContainerFormModalEstoqueComponent implements OnInit {

  public estoqueService = inject(EstoqueService);

  constructor(private fb: FormBuilder, public toastr: ToastrService) { }

  estoqueForm!: FormGroup;
  private alteracoesPendentes: Partial<Estoque> = {};
  private dadosOriginais: Estoque | null = null;
  public userService = inject(UserService);

  estoqueData: Estoque[] = [];

  @Input() visible = false;
  @Output() close = new EventEmitter<void>();
  @Output() estoqueCriado = new EventEmitter<void>();

  @HostListener('document:keydown.escape', ['$event'])
  onEscKey(event: KeyboardEvent) {
    if (this.visible) {
      this.onClose();
      this.resetForm();
    };
  };

  ngOnInit(): void {
    this.listarEstoque();
    this.estoqueForm = this.fb.group({
      nome_produto: [''],
      tipo_produto: [''],
      quantidade: [''],
      custo_unitario: [''],
      unidade_medida: [''],
      observacoes: ['']
    });
  };

  listarEstoque() {
    this.estoqueService.getAllEstoque().subscribe((data: Estoque[]) => {
      this.estoqueData = data;
    });
  };

  listarEstoquePorID() {
    this.estoqueService.getEstoqueByID(this.estoqueService.idEstoque).subscribe({
      next: (data: any) => {
        this.dadosOriginais = { ...data };
        this.resetForm();
      },
      error(e) {
        console.error('Erro ao buscar estoque por ID', e);
      }
    });
  };

  campoAlterado(campo: keyof Estoque, valor: any) {
    if ((this.dadosOriginais && this.dadosOriginais[campo] !== valor) || (this.dadosOriginais == null)) {
      this.alteracoesPendentes[campo] = valor;
    } else {
      delete this.alteracoesPendentes[campo];
      console.log('CAIU no delete');
    };
  };

  limparAlteracoesPendentes() {
    this.alteracoesPendentes = {};
  }

  atualizar() {
    if (this.estoqueService.verificaAtualizacaoEstoque) {
      this.estoqueService.updateEstoque(this.estoqueService.idEstoque, this.alteracoesPendentes).subscribe({
        next: (response) => {
          this.userService.toastr.success(`Estoque atualiazdo com sucesso !`);
          console.log(`Estoque atualiazdo com sucesso ! ${response}`);
          this.estoqueCriado.emit();
          this.resetForm();
        },
        error: (e) => {
          console.error(`Erro ao atualizar Estoque ! Erro: ${e}`);
        }
      });
    };
    this.close.emit();
    this.estoqueCriado.emit();
    this.listarEstoquePorID();
  };

  criarEstoque() {
    const novoEstoque: Omit<Estoque, 'id' | 'created_at' | 'updated_at'> = {
      nome_produto: this.estoqueForm.value.nome_produto,
      tipo_produto: this.estoqueForm.value.tipo_produto,
      quantidade: this.estoqueForm.value.quantidade,
      custo_unitario: this.estoqueForm.value.custo_unitario,
      unidade_medida: this.estoqueForm.value.unidade_medida,
      observacoes: this.estoqueForm.value.observacoes
    };

    this.estoqueService.postEstoque(novoEstoque).subscribe({
      next: (response) => {
        this.userService.toastr.success(`Estoque criado com Sucesso !`);
        this.estoqueCriado.emit();
        this.resetForm();
      },
      error: (e) => {
        console.error(`Erro ao criar estoque: ${e}`);
        this.toastr.error(`Erro ao criar estoque!`);
      }
    });
  };

  onClose() {
    this.close.emit();
    this.resetForm();
  };

  resetForm() {
    this.estoqueForm.reset({
      nome_produto: '',
      tipo_produto: '',
      quantidade: 0,
      custo_unitario: 0,
      unidade_medida: '',
      observacoes: ''
    });
    this.limparAlteracoesPendentes();
    this.dadosOriginais = null;
  };
};
