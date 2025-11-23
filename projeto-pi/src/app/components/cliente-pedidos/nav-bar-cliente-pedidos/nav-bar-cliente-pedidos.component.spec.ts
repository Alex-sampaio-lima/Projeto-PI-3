import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarClientePedidosComponent } from './nav-bar-cliente-pedidos.component';

describe('NavBarClientePedidosComponent', () => {
  let component: NavBarClientePedidosComponent;
  let fixture: ComponentFixture<NavBarClientePedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarClientePedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarClientePedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
