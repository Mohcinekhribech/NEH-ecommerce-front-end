import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersClientPageComponent } from './orders-client-page.component';

describe('OrdersClientPageComponent', () => {
  let component: OrdersClientPageComponent;
  let fixture: ComponentFixture<OrdersClientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrdersClientPageComponent]
    });
    fixture = TestBed.createComponent(OrdersClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
