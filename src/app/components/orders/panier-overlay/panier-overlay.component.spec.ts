import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PanierOverlayComponent } from './panier-overlay.component';

describe('PanierOverlayComponent', () => {
  let component: PanierOverlayComponent;
  let fixture: ComponentFixture<PanierOverlayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PanierOverlayComponent]
    });
    fixture = TestBed.createComponent(PanierOverlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
