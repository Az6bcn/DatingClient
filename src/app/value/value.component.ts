import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-value',
  templateUrl: './value.component.html',
  styleUrls: ['./value.component.css']
})
export class ValueComponent implements OnInit {

  values: Array<Value>;

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getValues()
        .subscribe ( (response: Array<Value>) => {
          this.values = response;
          console.log('Response Values:', response);
        } );
  }


  getValues (): Observable<Array<Value>> {

    return this.http.get<Array<Value>>('http://localhost:50440/api/values');
  }
}


export class Value {
  id: number;
  name: string;
}
