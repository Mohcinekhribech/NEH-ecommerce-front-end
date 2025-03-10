import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsUpdateFormComponent } from './tags-update-form.component';

describe('TagsUpdateFormComponent', () => {
  let component: TagsUpdateFormComponent;
  let fixture: ComponentFixture<TagsUpdateFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TagsUpdateFormComponent]
    });
    fixture = TestBed.createComponent(TagsUpdateFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
