import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserDetailNavCardComponent } from './user-detail-nav-card.component';

describe('UserDetailNavCardComponent', () => {
  let component: UserDetailNavCardComponent;
  let fixture: ComponentFixture<UserDetailNavCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserDetailNavCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserDetailNavCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
