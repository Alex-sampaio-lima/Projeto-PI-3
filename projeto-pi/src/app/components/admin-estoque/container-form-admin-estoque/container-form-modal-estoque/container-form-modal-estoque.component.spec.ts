import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormModalEstoqueComponent } from './container-form-modal-estoque.component';

describe('ContainerFormModalEstoqueComponent', () => {
  let component: ContainerFormModalEstoqueComponent;
  let fixture: ComponentFixture<ContainerFormModalEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormModalEstoqueComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ContainerFormModalEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
