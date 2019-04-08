import { Photo } from './../../../Model/Photo';
import { PhotoService } from './../../Services/photo.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { map, finalize } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-image-file-uploader',
  templateUrl: './image-file-uploader.component.html',
  styleUrls: ['./image-file-uploader.component.css']
})
export class ImageFileUploaderComponent implements OnInit {
  filelist: {};
  @Input() userID: number;
  @Input() photos: Array<Photo>;
  @Output()photosChange = new EventEmitter<Array<Photo>>();
  isLoading$ = new BehaviorSubject<boolean>(false);
  constructor(private photoService: PhotoService) {
  }

  ngOnInit() {
  }

  ProcessFile(imageInput: HTMLInputElement) {
    this.filelist = (imageInput.files);
  }

  Save(imageInput: HTMLInputElement) {
    this.isLoading$.next(true);
    const formdata = new FormData();

    formdata.append('UserID', this.userID.toString());
    formdata.append('File', imageInput.files[0]);
    formdata.append('Description', imageInput.files[0].name);

    this.photoService.Save(formdata, this.userID)
      .pipe(
        finalize(() => this.isLoading$.next(false)),
        map(p => {
          return new Photo(p.ID, p.Url, p.Description, p.IsMain, p.DateAdded);
        })
      )
      .subscribe(resp => {
        // add the new one to the photos list
        this.photos.push(resp);

        //re-emit it
        this.photosChange.emit(this.photos);

        // reset the uploader, delete the filelist
        this.filelist = {};
        imageInput.value = '';
      });
  }

}
