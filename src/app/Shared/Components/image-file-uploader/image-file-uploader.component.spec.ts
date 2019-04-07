import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageFileUploaderComponent } from './image-file-uploader.component';

describe('ImageFileUploaderComponent', () => {
  let component: ImageFileUploaderComponent;
  let fixture: ComponentFixture<ImageFileUploaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImageFileUploaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageFileUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
