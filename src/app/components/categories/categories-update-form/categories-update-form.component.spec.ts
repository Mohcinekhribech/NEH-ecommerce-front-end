import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesUpdateFormComponent } from './categories-update-form.component';

describe('CategoriesUpdateFormComponent', () => {
  let component: CategoriesUpdateFormComponent;
  let fixture: ComponentFixture<CategoriesUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriesUpdateFormComponent]
    });
    fixture = TestBed.createComponent(CategoriesUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
