import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCardapioComponent } from './main-cardapio.component';

describe('MainCardapioComponent', () => {
  let component: MainCardapioComponent;
  let fixture: ComponentFixture<MainCardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainCardapioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainCardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
