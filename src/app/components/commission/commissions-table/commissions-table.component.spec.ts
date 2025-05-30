import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommissionsTableComponent } from './commissions-table.component';

describe('CommissionsTableComponent', () => {
  let component: CommissionsTableComponent;
  let fixture: ComponentFixture<CommissionsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommissionsTableComponent]
    });
    fixture = TestBed.createComponent(CommissionsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
