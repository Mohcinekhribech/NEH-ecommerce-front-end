import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriessTableComponent } from './categoriess-table.component';

describe('CategoriessTableComponent', () => {
  let component: CategoriessTableComponent;
  let fixture: ComponentFixture<CategoriessTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoriessTableComponent]
    });
    fixture = TestBed.createComponent(CategoriessTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
