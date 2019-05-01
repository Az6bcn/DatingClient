import { User } from './User';
export class Like {
  LikeID: number;
  LikerUserID: number;
  LikeeUserID: number;
  Date: Date;
  LikerUser: User;
  LikeeUser: User;
}
