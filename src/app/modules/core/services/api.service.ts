import { Injectable } from '@angular/core';
import { environment } from '@src/environments/environment';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ApiService {
  url: string;

  constructor(private http: HttpClient) {
    this.url = environment.api;
  }

  private formatErrors(error: any) {
    return throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
    return this.http.get(`${this.url}${path}`, { params }).pipe(catchError(this.formatErrors));
  }

  put(path: string, body: object = {}): Observable<any> {
    return this.http.put(`${this.url}${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  post(path: string, body: object = {}): Observable<any> {
    return this.http.post(`${this.url}${path}`, JSON.stringify(body)).pipe(catchError(this.formatErrors));
  }

  delete(path: string): Observable<any> {
    return this.http.delete(`${this.url}${path}`).pipe(catchError(this.formatErrors));
  }
}
