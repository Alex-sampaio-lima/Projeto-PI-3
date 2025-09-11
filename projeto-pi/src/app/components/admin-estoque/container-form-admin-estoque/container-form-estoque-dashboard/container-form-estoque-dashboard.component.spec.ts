import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerFormEstoqueDashboardComponent } from './container-form-estoque-dashboard.component';

describe('ContainerFormEstoqueDashboardComponent', () => {
  let component: ContainerFormEstoqueDashboardComponent;
  let fixture: ComponentFixture<ContainerFormEstoqueDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerFormEstoqueDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerFormEstoqueDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
