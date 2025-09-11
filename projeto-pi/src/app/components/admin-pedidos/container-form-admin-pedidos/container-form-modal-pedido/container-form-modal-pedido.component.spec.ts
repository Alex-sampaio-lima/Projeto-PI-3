import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormModalPedidoComponent } from './container-form-modal-pedido.component';

describe('ContainerFormModalPedidoComponent', () => {
  let component: ContainerFormModalPedidoComponent;
  let fixture: ComponentFixture<ContainerFormModalPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormModalPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormModalPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
