import { Injectable, Signal } from '@angular/core';
import { SIGNAL } from '@angular/core/primitives/signals';
import { BehaviorSubject } from 'rxjs';

export enum LoadingAmbianceState {
  NONE,
  LOADING,
}

@Injectable({
  providedIn: 'root'
})
export class LoadingAmbianceService {

  private loadingAmbianceStateBehaviorSubject= new BehaviorSubject<LoadingAmbianceState>(LoadingAmbianceState.NONE);
  loadingAmbianceState$ = this.loadingAmbianceStateBehaviorSubject.asObservable();

  set loadingAmbianceState(newState: LoadingAmbianceState) {
    this.loadingAmbianceStateBehaviorSubject.next(newState);
  }

  get loadingAmbianceState() {
    return this.loadingAmbianceStateBehaviorSubject.getValue()
  }

  constructor() { }
}
