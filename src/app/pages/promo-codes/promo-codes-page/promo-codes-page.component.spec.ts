import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodesPageComponent } from './promo-codes-page.component';

describe('PromoCodesPageComponent', () => {
  let component: PromoCodesPageComponent;
  let fixture: ComponentFixture<PromoCodesPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromoCodesPageComponent]
    });
    fixture = TestBed.createComponent(PromoCodesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
