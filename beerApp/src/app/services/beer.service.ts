import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {BehaviorSubject, MonoTypeOperatorFunction, of, pipe} from 'rxjs';
import {BeerResponseModel} from '../models/Beer/beer-response.model';
import {finalize, map, tap} from 'rxjs/operators';
import {BeerModel} from '../models/Beer/beer.model';
import {SearchDataModel} from '../models/searchData.model';
import {StylesResponseModel} from '../models/Style/styles-response.model';
import {StyleModel} from '../models/Style/style.model';
import {LoadingService} from './loading.service';

@Injectable()
export class BeerService {

    searchData$ = new BehaviorSubject<SearchDataModel>(
        {
            currentPage: 0,
            numberOfPages: 0,
            totalResults: 0,
        });
    beers$ = new BehaviorSubject<BeerModel[]>([]);
    beer$ = new BehaviorSubject<BeerModel[]>([]);
    styles$ = new BehaviorSubject<StyleModel[]>([]);
    private beers: BeerModel[];

    constructor(private http: HttpClient,
                private loadingService: LoadingService) {
    }

    extractSearchData(): MonoTypeOperatorFunction<BeerResponseModel> {
        return tap<BeerResponseModel>((response) => {
            const responseCopy = {...response};
            delete responseCopy.data;
            this.searchData$.next(responseCopy);
            return response;
        });
    }

    transformData = () => pipe(
        this.extractSearchData(),
        map(beerResponse => beerResponse.data),
        tap(beers => this.beers = beers),
        finalize(() => this.loadingService.loadingOff())
    )

    searchBeerName(keyword: string): void {
        this.loadingService.loadingOn();
        this.http.get<BeerResponseModel>(`/api/beers/?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`)
            .pipe(
                this.transformData(),
            ).subscribe(beers => this.beers$.next(beers)
            );
    }

    searchBeerStyle(keyword: string): void {
        this.loadingService.loadingOn();
        this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&styleId=${keyword}`)
            .pipe(
                this.transformData(),
            )
            .subscribe(beers => this.beers$.next(beers)
            );
    }

    getBreweryBeers(breweryId: string): void {
        this.loadingService.loadingOn();
        this.http.get<BeerResponseModel>(`/api/brewery/${breweryId}/beers?key=659d5c6b8f3d2447f090119e48202fdb`)
            .pipe(
                this.transformData(),
            )
            .subscribe(beers => this.beers$.next(beers)
            );
    }

    beerPageChange(nextPage: string | number): void {
        this.loadingService.loadingOn();
        this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&p=${nextPage}`)
            .pipe(
                this.transformData(),
            )
            .subscribe(beers => this.beers$.next(beers)
            );
    }

    getAllStyles(): void {
        this.http.get<StylesResponseModel>(`/api/styles?key=659d5c6b8f3d2447f090119e48202fdb`)
            .pipe(
            map(stylesResponse => stylesResponse.data
                .sort((a, b) => a.name.localeCompare(b.name)))
            )
            .subscribe(styles => this.styles$.next(styles)
            );
    }

    getBeerByIndex(index: number): void {
        this.beer$.next([this.beers[index]]);
    }

}
