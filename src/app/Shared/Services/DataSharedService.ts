import { BehaviorSubject } from 'rxjs';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
export class DataSharedService {

  private message = new BehaviorSubject<string>('');
  // convert 'message' to observable so that consumers can sunbscribe to it
  public currentMessage = this.message.asObservable();

  constructor() {

  }

   ChangeMessage(newMessage: string) {
    this.message.next(newMessage);
  }
}
