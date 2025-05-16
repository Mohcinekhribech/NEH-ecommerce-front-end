import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromoCodesTableComponent } from './promo-codes-table.component';

describe('PromoCodesTableComponent', () => {
  let component: PromoCodesTableComponent;
  let fixture: ComponentFixture<PromoCodesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PromoCodesTableComponent]
    });
    fixture = TestBed.createComponent(PromoCodesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
