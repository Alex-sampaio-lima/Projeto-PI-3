import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormClientePedidosDashboardComponent } from './container-form-cliente-pedidos-dashboard.component';

describe('ContainerFormClientePedidosDashboardComponent', () => {
  let component: ContainerFormClientePedidosDashboardComponent;
  let fixture: ComponentFixture<ContainerFormClientePedidosDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormClientePedidosDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormClientePedidosDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
