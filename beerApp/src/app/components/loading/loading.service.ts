import {BehaviorSubject, Observable, of} from "rxjs";
import {finalize, map, tap} from "rxjs/operators";

export class LoadingService {
  loading$ = new BehaviorSubject<boolean>(false)

  showLoadingUntilCompleted<T>(obs$: Observable<T>): Observable<any>{
    return of(null)
      .pipe(
      tap(() => this.loadingOn()),
        map(() => obs$),
        finalize(() => this.loadingOff())
      )
  }

  loadingOn(){
    this.loading$.next(true)
  }

  loadingOff(){
    this.loading$.next(false)
  }
}
