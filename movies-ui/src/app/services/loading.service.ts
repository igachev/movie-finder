import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  private _loadingSpiner = new BehaviorSubject<boolean>(false);
  public $loadingSpinner = this._loadingSpiner.asObservable();

  constructor() { }

  set loadingSpinner(isLoading: boolean) {
    this._loadingSpiner.next(isLoading)
  }

}
