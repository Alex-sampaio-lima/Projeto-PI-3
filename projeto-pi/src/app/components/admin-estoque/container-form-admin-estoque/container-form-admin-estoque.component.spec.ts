import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormAdminEstoqueComponent } from './container-form-admin-estoque.component';

describe('ContainerFormAdminEstoqueComponent', () => {
  let component: ContainerFormAdminEstoqueComponent;
  let fixture: ComponentFixture<ContainerFormAdminEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormAdminEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormAdminEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
