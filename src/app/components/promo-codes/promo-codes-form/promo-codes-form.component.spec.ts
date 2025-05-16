import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodesFormComponent } from './promo-codes-form.component';

describe('PromoCodesFormComponent', () => {
  let component: PromoCodesFormComponent;
  let fixture: ComponentFixture<PromoCodesFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromoCodesFormComponent]
    });
    fixture = TestBed.createComponent(PromoCodesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
