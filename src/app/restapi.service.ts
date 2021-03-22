import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

export interface Convertedtime {
  epoch: number;
  toTimestamp: number;
  fromAbbreviation: string;
  toAbbreviation: string;

}

const endpoint = `https://gqhvylstke.execute-api.us-east-2.amazonaws.com/Prod/serverdate`;
const timezonedb = `http://api.timezonedb.com/v2.1/convert-time-zone?key=TSWVHT8C4CJK&format=json&from=UTC&to=Asia/Singapore&time=`;

@Injectable({
  providedIn: 'root'
})
export class RestapiService {

  constructor(private httpClient: HttpClient) { }



  getServertime(): Observable<any> {
    return this.httpClient.get(endpoint).pipe(
      catchError(this.handleError)
    );
  }

  getConvertedtime(epoch: number): Observable<any> {
    return this.httpClient.get<Convertedtime>(timezonedb + epoch).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
