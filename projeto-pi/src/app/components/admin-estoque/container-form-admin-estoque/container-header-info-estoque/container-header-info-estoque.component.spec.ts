import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerHeaderInfoEstoqueComponent } from './container-header-info-estoque.component';

describe('ContainerHeaderInfoPedidosComponent', () => {
  let component: ContainerHeaderInfoEstoqueComponent;
  let fixture: ComponentFixture<ContainerHeaderInfoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerHeaderInfoEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerHeaderInfoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
