import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormAdminPedidosComponent } from './container-form-admin-pedidos.component';

describe('ContainerFormAdminPedidosComponent', () => {
  let component: ContainerFormAdminPedidosComponent;
  let fixture: ComponentFixture<ContainerFormAdminPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormAdminPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormAdminPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
