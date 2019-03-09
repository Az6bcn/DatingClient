export class Photo {
  ID: number;
  Url: string;
  Description: string;
  IsMain: boolean;
  DateAdded: Date;


  constructor(id: number, url: string, description: string, ismain: boolean, dateadded: Date) {
    this.ID = id;
    this.Url = url;
    this.Description = description;
    this.IsMain = ismain;
    this.DateAdded = dateadded;
  }
}
