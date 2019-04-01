import { PhotoService } from './../../../Shared/Services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Photo } from '../../../../app/Model/Photo';

@Component({
  selector: 'app-user-edit-photo',
  templateUrl: './user-edit-photo.component.html',
  styleUrls: ['./user-edit-photo.component.css']
})
export class UserEditPhotoComponent implements OnInit {
  @Input() photos: Array<Photo>;
  @Output()photosChange = new EventEmitter<Array<Photo>>();
  private baseUrl: string = environment.baseURL;
  private urlPhoto: string;
  private options: FileUploaderOptions;
  private userID: number;


  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  constructor(private activatedRoute: ActivatedRoute,
              private photoService: PhotoService) {
    this.photos = new Array<Photo>();
  }
  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.params['id'];

    if (this.userID) {
      this.urlPhoto = `/users/${this.userID}/photos`;
      const urls = `${this.baseUrl}${this.urlPhoto}`;
      this.uploader = new FileUploader({url: urls});
    }
  }
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  public fileOverAnother(e: any): void {
    this.hasAnotherDropZoneOver = e;
  }

  SetAsMain (photoID: number) {
    // send to server

    // successfull => change current main to No and select as main, reemit list


  }

  DeletePhoto (photoID: number) {
    // delete
    this.photoService.DeletePhoto(photoID, this.userID)
      .subscribe( response => {
        // successfull => remove from current
        let photoIndex = this.photos.findIndex(p => p.ID === photoID);

        this.photos.splice(photoIndex, 1);
        // remit list
        this.photosChange.emit(this.photos);
      },
      error => {
        alert('error deleting');
      });
  }

}
