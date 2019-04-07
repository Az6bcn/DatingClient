import { JwtHelperService } from '@auth0/angular-jwt';
import { DataSharedService } from './../../../Shared/Services/DataSharedService';
import { PhotoService } from './../../../Shared/Services/photo.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FileSelectDirective, FileDropDirective, FileUploader, FileUploaderOptions } from 'ng2-file-upload/ng2-file-upload';
import { environment } from '../../../../environments/environment';
import { Photo } from '../../../../app/Model/Photo';
import { NotifierService } from 'angular-notifier';

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
  userID: number;


  public uploader: FileUploader;
  public hasBaseDropZoneOver = false;
  public hasAnotherDropZoneOver = false;
  constructor(private activatedRoute: ActivatedRoute,
              private photoService: PhotoService,
              private dataSharedService: DataSharedService,
              private notifierService: NotifierService,
              private jwtHelperService: JwtHelperService) {
    this.photos = new Array<Photo>();
  }
  ngOnInit() {
    this.userID = this.activatedRoute.snapshot.params['id'];

    if (this.userID) {
      this.urlPhoto = `/users/${this.userID}/photos`;
      const urls = `${this.baseUrl}${this.urlPhoto}`;
      this.uploader = new FileUploader({url: urls, authToken: 'Bearer ' + this.jwtHelperService.tokenGetter()});
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
    this.photoService.SetMainPhoto(photoID, this.userID)
      .subscribe(response => {
        // successfull => change previous main to No and current photoID as main,
        this.photos.find(p => p.IsMain === true).IsMain = false;

        this.photos.find(p => p.ID === photoID).IsMain = true;
        const currentMainPhoto = this.photos.find(p => p.ID === photoID);

        //reemit list
        this.photosChange.emit(this.photos);

        //change main in sharedData service
        this.dataSharedService.ChangeMessage(currentMainPhoto.Url);

        this.notifierService.notify('success', 'Main photo changed successfully');
      },
      error => {
        this.notifierService.notify('error', 'error changing main photo, try again later');
      });


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

        this.notifierService.notify('success', 'Photo delete successfully');
      },
      error => {
        this.notifierService.notify('error', 'error deleting photo, try again later');
      });
  }

}
