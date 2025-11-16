import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminLoginAgendaComponent } from './admin-login-agenda.component';

describe('AdminLoginAgendaComponent', () => {
  let component: AdminLoginAgendaComponent;
  let fixture: ComponentFixture<AdminLoginAgendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminLoginAgendaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminLoginAgendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
