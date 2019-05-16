export class MessageReturned {
  ID: number;
  Content: string;
  IsRead: boolean;
  DateRead: Date;
  MessageSent: Date;
  SenderID: number;
  SenderKnownAs: string;
  RecipientID: number;
  RecipientKnownAs: string;
  SenderPhotoURL: string;
  RecipientPhotoURL: string;
}
