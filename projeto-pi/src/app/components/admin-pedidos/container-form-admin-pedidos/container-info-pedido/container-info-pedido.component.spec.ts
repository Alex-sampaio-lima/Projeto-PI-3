import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInfoPedidoComponent } from './container-info-pedido.component';

describe('ContainerInfoPedidoComponent', () => {
  let component: ContainerInfoPedidoComponent;
  let fixture: ComponentFixture<ContainerInfoPedidoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerInfoPedidoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerInfoPedidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
