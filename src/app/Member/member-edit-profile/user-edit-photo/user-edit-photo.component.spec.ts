import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditPhotoComponent } from './user-edit-photo.component';

describe('UserEditPhotoComponent', () => {
  let component: UserEditPhotoComponent;
  let fixture: ComponentFixture<UserEditPhotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditPhotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditPhotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
