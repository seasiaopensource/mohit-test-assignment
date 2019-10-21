import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from '@src/app/modules/core/services/api.service';
import { ITermResponse, ITermResult } from '@src/app/modules/core/models';

@Injectable()
export class SearchService {
  resultSet: {
    [key: string]: ITermResult;
  };

  constructor(private apiService: ApiService) {
    this.resultSet = {};
  }

  /**
   * method for fetching the results
   * @param text string to search for
   */
  fetchResults(text: string): Observable<ITermResult> {
    // check from cache results
    if (this.resultSet[text] && !this.resultSet[text].error) {
      return of(this.resultSet[text]);
    }

    // assign new result set
    this.resultSet[text] = { error: false, result: { list: [] } };

    // create params for search
    const params: HttpParams = new HttpParams({ fromObject: { term: text } });
    return this.apiService.get('define', params).pipe(
      catchError((error) => {
        this.resultSet[text].error = true;
        return of(this.resultSet[text].result);
      }),
      map((response: ITermResponse) => {
        this.resultSet[text].result = response;
        return this.resultSet[text];
      })
    );
  }
}
