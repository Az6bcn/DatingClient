import { Photo } from './Photo';
export class UserDetails{
  Id: number;
  Username: string;
  KnownAs: string;
  Age: number;
  Country: string;
  City: string;
  Introduction: string;
  Interests: string;
  CreatedAt: Date;
  LastActive: Date;

  Photos: Array<Photo>;
  PhotoURL: string;


  constructor() {
    this.Photos = new Array<Photo>();
  }
}
