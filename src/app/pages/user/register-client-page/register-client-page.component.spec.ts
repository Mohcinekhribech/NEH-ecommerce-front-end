import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterClientPageComponent } from './register-client-page.component';

describe('RegisterClientPageComponent', () => {
  let component: RegisterClientPageComponent;
  let fixture: ComponentFixture<RegisterClientPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegisterClientPageComponent]
    });
    fixture = TestBed.createComponent(RegisterClientPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
