import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsClientPageComponent } from './products-client-page.component';

describe('ProductsClientPageComponent', () => {
  let component: ProductsClientPageComponent;
  let fixture: ComponentFixture<ProductsClientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsClientPageComponent]
    });
    fixture = TestBed.createComponent(ProductsClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
