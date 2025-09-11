import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarAdminPedidosComponent } from './nav-bar-admin-pedidos.component';

describe('NavBarAdminPedidosComponent', () => {
  let component: NavBarAdminPedidosComponent;
  let fixture: ComponentFixture<NavBarAdminPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarAdminPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBarAdminPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
