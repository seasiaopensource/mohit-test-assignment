import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { ITermList, ITermResult, SearchService } from '@src/app/modules/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.sass']
})
export class SearchBoxComponent implements OnInit {
  searchText = new FormControl();
  isLoadingResults: boolean;
  results: ITermList[];
  showError: boolean;

  constructor(private searchService: SearchService) {}

  ngOnInit() {
    this.searchText.valueChanges
      .pipe(debounceTime(250))
      .subscribe((changes: string) => this._getResults(changes));
  }

  /**
   * fetch the results
   * @param text string to search for.
   */
  private _getResults(text: string) {
    this._reset();
    this._startLoading();

    if (!text) {
      this._stopLoading();
      return;
    }

    this.searchService
      .fetchResults(text)
      .subscribe((records) => this._assignResults(text, records));
  }

  /**
   *
   * @param term text to search
   * @param response from the API
   */
  private _assignResults(term: string, response: ITermResult) {
    if (this.searchText.value === term) {
      this._stopLoading();
      if (response.error) {
        this.showError = true;
      }
      this.results = response.result.list;
    }
  }

  /**
   * hide loading
   */
  private _stopLoading() {
    if (this.isLoadingResults) {
      this.isLoadingResults = false;
    }
  }

  /**
   * show loading
   */
  private _startLoading() {
    if (!this.isLoadingResults) {
      this.isLoadingResults = true;
    }
  }

  /**
   * reset the search
   */
  private _reset() {
    this.results = null;
    this.showError = false;
  }
}
