import { Component, OnInit, Input } from '@angular/core';
import { NgxGalleryImage, NgxGalleryOptions, NgxGalleryAnimation } from 'ngx-gallery';
import { Photo } from '../Model/Photo';

@Component({
  selector: 'app-user-photos',
  templateUrl: './user-photos.component.html',
  styleUrls: ['./user-photos.component.css']
})
export class UserPhotosComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  @Input() galleryImages: Array<Photo>;
  ngxGalleryImages: NgxGalleryImage[];

  constructor() { }

  ngOnInit() {
    if (this.galleryImages && this.galleryImages.length > 0) {
      this.ngxGalleryImages = this.galleryImages
                                .map( p => {
                                  return new NgxGalleryImage({small: p.Url, big: p.Url, medium: p.Url,
                                    description: p.Description, url: p.Url});
                                } );
    }

    this.galleryOptions = [
      {
          width: '600px',
          height: '400px',
          thumbnailsColumns: 4,
          imageAnimation: NgxGalleryAnimation.Slide
      },
      // max-width 800
      {
          breakpoint: 800,
          width: '100%',
          height: '600px',
          imagePercent: 80,
          thumbnailsPercent: 20,
          thumbnailsMargin: 20,
          thumbnailMargin: 20
      },
      // max-width 400
      {
          breakpoint: 400,
          preview: false
      }
  ];
  }

}
