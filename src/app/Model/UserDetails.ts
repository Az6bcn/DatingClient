import { Photo } from './Photo';
export class UserDetails{
  Id: number;
  Username: string;
  KnownAs: string;
  Age: number;
  Country: string;
  City: string;
  Introduction: string;
  LookingFor: string;
  Interests: string;
  CreatedAt: Date;
  LastActive: Date;

  Photos: Array<Photo>;
  PhotoUrl: string;


  constructor() {
    this.Photos = new Array<Photo>();
  }
}
