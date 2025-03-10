import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesClientPageComponent } from './categories-client-page.component';

describe('CategoriesClientPageComponent', () => {
  let component: CategoriesClientPageComponent;
  let fixture: ComponentFixture<CategoriesClientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesClientPageComponent]
    });
    fixture = TestBed.createComponent(CategoriesClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
