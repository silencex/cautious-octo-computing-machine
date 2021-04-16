import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { formatDate } from "@angular/common";

import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";

class CoindeskHistoricalResponse {
  bpi: Map<string, string> = new Map()
}

@Injectable({
  providedIn: 'root'
})
export class CoindeskService {

  constructor(private http: HttpClient) { }
  
  getBpi(from: Date, to: Date): Observable<number[]> {
    let url = `https://api.coindesk.com/v1/bpi/historical/close.json?start=${formatDate(from, "yyyy-MM-dd", "en-US")}&end=${formatDate(to, "yyyy-MM-dd", "en-US")}`
    return this.http.get<CoindeskHistoricalResponse>(url).pipe(
      tap(r => console.log(Object.values(r.bpi))),
      map(r => Object.values(r.bpi).map(v => +v))
    )
  }
}
