import {HttpClient} from '@angular/common/http';
import {BreweryModel} from '../models/Brewery/brewery.model';
import {Injectable} from '@angular/core';
import {BehaviorSubject, MonoTypeOperatorFunction} from 'rxjs';
import {BreweryResponseModel} from '../models/Brewery/brewery-response.model';
import {finalize, map, tap} from 'rxjs/operators';
import {BreweryLocationResponseModel} from '../models/Brewery/brewery-location-response.model';
import {SearchDataModel} from '../models/searchData.model';
import {LoadingService} from './loading.service';

type BreweryResponse = BreweryResponseModel | BreweryLocationResponseModel;

@Injectable()
export class BreweryService {
    breweries$ = new BehaviorSubject<BreweryModel[]>([]);
    brewery$ = new BehaviorSubject<BreweryModel[]>([]);
    private breweries: BreweryModel[];
    countryCodes$ = new BehaviorSubject([]);
    searchData$ = new BehaviorSubject<SearchDataModel>(
        {
            currentPage: 0,
            numberOfPages: 0,
            totalResults: 0,
        });

    constructor(private http: HttpClient, private loadingService: LoadingService) {
    }

    extractSearchData(): MonoTypeOperatorFunction<BreweryResponse> {
        return tap<BreweryResponse>((response) => {
            const responseCopy = {...response};
            delete responseCopy.data;
            this.searchData$.next(responseCopy);
            return response;
        });
    }

    breweryNameSearch(keyword: string): void {
        this.loadingService.loadingOn();
        this.http.get<BreweryResponseModel>(`/api/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`)
            .pipe(
                this.extractSearchData(),
                map(breweryResponse => breweryResponse.data),
                tap((breweries: BreweryModel[]) => this.breweries = breweries),
                finalize(() => this.loadingService.loadingOff())
            )
            .subscribe((breweries: BreweryModel[]) => this.breweries$.next(breweries));
    }

    breweryCountrySearch(keyword: string): void {
        this.loadingService.loadingOn();
        this.http.get<BreweryLocationResponseModel>(`/api/locations/?key=659d5c6b8f3d2447f090119e48202fdb&countryIsoCode=${keyword}`)
            .pipe(
                this.extractSearchData(),
                map((locationResponse: BreweryLocationResponseModel) => locationResponse.data
                    .map(locations => locations.brewery)),
                // filtering out duplicates provided by location search response
                map(breweries => breweries.filter((v, i, a) => a.findIndex(t => (t.id === v.id)) === i)),
                tap(breweries => this.breweries = breweries),
                finalize(() => this.loadingService.loadingOff())
            )
            .subscribe(breweries => this.breweries$.next(breweries)
            );
    }

    getBreweryByIndex(index: number): void {
        this.brewery$.next([this.breweries[index]]);
    }

    getCountryCodes(): void {
        this.http.get<BreweryLocationResponseModel>(`/api/locations/?key=659d5c6b8f3d2447f090119e48202fdb`)
            .pipe(
                map(locationResponse => locationResponse.data),
                // filtering out duplicates provided by location search response
                map(locations => locations
                        .filter((v, i, a) => a.findIndex(t => (t.countryIsoCode === v.countryIsoCode)) === i)
                        .sort((b, a) => a.name.localeCompare(b.name)),
                ))
            .subscribe(countryCodes => this.countryCodes$.next(countryCodes)
            );
    }
}
