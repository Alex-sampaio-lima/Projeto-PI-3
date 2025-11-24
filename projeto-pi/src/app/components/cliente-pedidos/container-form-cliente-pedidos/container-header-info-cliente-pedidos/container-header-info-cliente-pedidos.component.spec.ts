import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerHeaderInfoClientePedidosComponent } from './container-header-info-cliente-pedidos.component';

describe('ContainerHeaderInfoClientePedidosComponent', () => {
  let component: ContainerHeaderInfoClientePedidosComponent;
  let fixture: ComponentFixture<ContainerHeaderInfoClientePedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerHeaderInfoClientePedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerHeaderInfoClientePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
