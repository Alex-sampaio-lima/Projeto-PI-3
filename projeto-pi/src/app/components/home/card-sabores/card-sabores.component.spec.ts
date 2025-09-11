import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardSaboresComponent } from './card-sabores.component';

describe('CardSaboresComponent', () => {
  let component: CardSaboresComponent;
  let fixture: ComponentFixture<CardSaboresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardSaboresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardSaboresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
