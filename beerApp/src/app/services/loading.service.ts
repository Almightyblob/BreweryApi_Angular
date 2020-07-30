import {BehaviorSubject} from 'rxjs';

export class LoadingService {
    loading$ = new BehaviorSubject<boolean>(false);

    loadingOn(): void {
        this.loading$.next(true);
    }

    loadingOff(): void {
        this.loading$.next(false);
    }
}
