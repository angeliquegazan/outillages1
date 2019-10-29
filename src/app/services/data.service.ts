import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class DataService {
  constructor(private http: Http) { }

  /*
  * Get all data
  */
  get() {
    return this.http.get(environment.api + "/moreorless/get/").map(res => res.json());
  }

  /**
  * Add a new data
  */
  add(attempt, elapsedTime, numberToFind) {
    return this.http.post(environment.api + "/moreorless/add",{
      attempt: attempt,
      numberToFind: numberToFind,
      elapsedTime: elapsedTime,
      date: Date.now()
    }).map(res => res.json());
  }
}
