import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerLoginInputComponent } from './container-login-input.component';

describe('ContainerLoginInputComponent', () => {
  let component: ContainerLoginInputComponent;
  let fixture: ComponentFixture<ContainerLoginInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerLoginInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerLoginInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
