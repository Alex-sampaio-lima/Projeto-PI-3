import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormPedidoDashBoardComponent } from './container-form-pedido-dashboard.component';

describe('ContainerFormPedidoComponent', () => {
  let component: ContainerFormPedidoDashBoardComponent;
  let fixture: ComponentFixture<ContainerFormPedidoDashBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormPedidoDashBoardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormPedidoDashBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
