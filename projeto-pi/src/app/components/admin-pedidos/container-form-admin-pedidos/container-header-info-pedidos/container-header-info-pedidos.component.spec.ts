import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerHeaderInfoPedidosComponent } from './container-header-info-pedidos.component';

describe('ContainerHeaderInfoPedidosComponent', () => {
  let component: ContainerHeaderInfoPedidosComponent;
  let fixture: ComponentFixture<ContainerHeaderInfoPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerHeaderInfoPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerHeaderInfoPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
