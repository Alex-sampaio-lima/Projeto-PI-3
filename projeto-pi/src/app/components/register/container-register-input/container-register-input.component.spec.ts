import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerRegisterInputComponent } from './container-register-input.component';

describe('ContainerRegisterInputComponent', () => {
  let component: ContainerRegisterInputComponent;
  let fixture: ComponentFixture<ContainerRegisterInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerRegisterInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerRegisterInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
