import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormClientePedidosComponent } from './container-form-cliente-pedidos.component';

describe('ContainerFormClientePedidosComponent', () => {
  let component: ContainerFormClientePedidosComponent;
  let fixture: ComponentFixture<ContainerFormClientePedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormClientePedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormClientePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
