import { MessageReturned } from './../../Model/MessageReturned';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements OnInit {

  @Input() messageToDisplay: Array<MessageReturned>;
  @Input() messageType: string;
  @Output() messageIdToDelete = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
    console.log(this.messageType);
  }

  Delete(id: number) {
    this.messageIdToDelete.emit(id);
  }

}
