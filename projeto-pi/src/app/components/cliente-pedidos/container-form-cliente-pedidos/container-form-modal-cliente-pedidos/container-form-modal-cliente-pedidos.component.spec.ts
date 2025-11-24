import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormModalClientePedidosComponent } from './container-form-modal-cliente-pedidos.component';

describe('ContainerFormModalClientePedidosComponent', () => {
  let component: ContainerFormModalClientePedidosComponent;
  let fixture: ComponentFixture<ContainerFormModalClientePedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormModalClientePedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormModalClientePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
