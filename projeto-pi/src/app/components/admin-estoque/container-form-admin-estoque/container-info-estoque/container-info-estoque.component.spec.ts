import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerInfoEstoqueComponent } from './container-info-estoque.component';

describe('ContainerInfoEstoqueComponent', () => {
  let component: ContainerInfoEstoqueComponent;
  let fixture: ComponentFixture<ContainerInfoEstoqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerInfoEstoqueComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerInfoEstoqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
