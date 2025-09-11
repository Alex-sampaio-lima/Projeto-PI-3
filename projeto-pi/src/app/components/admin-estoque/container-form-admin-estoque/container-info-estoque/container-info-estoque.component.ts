import { Component, inject, OnInit } from '@angular/core';
import { ContainerFormEstoqueDashboardComponent } from '../container-form-estoque-dashboard/container-form-estoque-dashboard.component';
import { EstoqueService } from '../../../../../services/estoque.service';

@Component({
  selector: 'app-container-info-estoque',
  imports: [],
  templateUrl: './container-info-estoque.component.html',
  styleUrl: './container-info-estoque.component.css'
})
export class ContainerInfoEstoqueComponent {

  estoqueService = inject(EstoqueService);

}
