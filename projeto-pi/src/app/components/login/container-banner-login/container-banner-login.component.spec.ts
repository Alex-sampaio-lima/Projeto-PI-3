import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerBannerLoginComponent } from './container-banner-login.component';

describe('ContainerBannerLoginComponent', () => {
  let component: ContainerBannerLoginComponent;
  let fixture: ComponentFixture<ContainerBannerLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerBannerLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerBannerLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
