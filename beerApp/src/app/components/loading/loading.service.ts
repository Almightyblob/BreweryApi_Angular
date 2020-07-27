import {BehaviorSubject} from "rxjs";

export class LoadingService {
  loading$ = new BehaviorSubject<boolean>(false)

  loadingOn(){
    this.loading$.next(true)
  }

  loadingOff(){
    this.loading$.next(false)
  }
}
