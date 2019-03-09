export class User {
  Id: number;
  Username: string;
  KnownAs: string;
  Age: number;
  Country: string;
  City: string;
  CreatedAt: Date;
  LastActive: Date;
  PhotoURL: string;

  constructor(
    id: number,
    username: string,
    knownas: string,
    age: number,
    country: string,
    city: string,
    createdaT: Date,
    lastactive: Date,
    photourl: string) {
      this.Id = id;
      this.Username = username;
      this.KnownAs = knownas;
      this.Age = age;
      this.Country = country;
      this.City = city;
      this.CreatedAt = createdaT;
      this.LastActive = lastactive;
      this.PhotoURL = photourl;
  }
}
