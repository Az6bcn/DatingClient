import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberEditProfileComponent } from './member-edit-profile.component';

describe('MemberEditProfileComponent', () => {
  let component: MemberEditProfileComponent;
  let fixture: ComponentFixture<MemberEditProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MemberEditProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MemberEditProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
