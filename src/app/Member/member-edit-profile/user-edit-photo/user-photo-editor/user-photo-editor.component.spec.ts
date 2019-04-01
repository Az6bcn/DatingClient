import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPhotoEditorComponent } from './user-photo-editor.component';

describe('UserPhotoEditorComponent', () => {
  let component: UserPhotoEditorComponent;
  let fixture: ComponentFixture<UserPhotoEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserPhotoEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserPhotoEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
