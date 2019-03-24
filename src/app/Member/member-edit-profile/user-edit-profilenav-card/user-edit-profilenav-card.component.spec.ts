import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserEditProfilenavCardComponent } from './user-edit-profilenav-card.component';

describe('UserEditProfilenavCardComponent', () => {
  let component: UserEditProfilenavCardComponent;
  let fixture: ComponentFixture<UserEditProfilenavCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserEditProfilenavCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditProfilenavCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
