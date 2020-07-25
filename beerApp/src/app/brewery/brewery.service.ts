import {HttpClient} from "@angular/common/http";
import {BreweryModel} from "../models/Brewery/brewery.model";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {BreweryResponseModel} from "../models/Brewery/brewery-response.model";
import {finalize, map, tap} from "rxjs/operators";
import {BreweryLocationResponseModel} from "../models/Brewery/brewery-location-response.model";
import {BeerResponseModel} from "../models/Beer/beer-response.model";
import {SearchDataModel} from "../models/searchData.model";
import {LoadingService} from "../components/loading/loading.service";

@Injectable()
export class BreweryService {
  breweries$ = new BehaviorSubject<BreweryModel[]>([]);
  brewery$ = new BehaviorSubject<BreweryModel[]>([]);
  private breweries: BreweryModel[];
  searchData$ = new BehaviorSubject<SearchDataModel>(
    {  "currentPage": 0,
      "numberOfPages": 0,
      "totalResults": 0,})
  countryCodes$ = new BehaviorSubject([]);

  constructor(private http: HttpClient, private loadingService: LoadingService) {
  }

  extractSearchData(response){
    let responseCopy = {...response}
    delete responseCopy.data
    this.searchData$.next(responseCopy);
  }

  breweryNameSearch(keyword: string){
    this.loadingService.loadingOn()
    this.http.get<BreweryResponseModel>(`/api/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`)
      .pipe(
        tap(breweryResponse => {
          this.extractSearchData(breweryResponse)
        }),
        map(breweryResponse => breweryResponse.data),
        finalize(() => this.loadingService.loadingOff())
      )
      .subscribe((breweries: BreweryModel[]) => {
        this.breweries = breweries
        this.breweries$.next(breweries)
      })
  }

  breweryCountrySearch(keyword: string){
    this.loadingService.loadingOn()
    this.http.get<BreweryLocationResponseModel>(`/api/locations/?key=659d5c6b8f3d2447f090119e48202fdb&countryIsoCode=${keyword}`)
      .pipe(
        tap(breweryResponse => {
          this.extractSearchData(breweryResponse)
        }),
        map(locationResponse => locationResponse.data.map(locations => locations.brewery)),
        // filtering out duplicates provided by location search response
        map( breweries => breweries.filter((v, i, a) => a.findIndex(t=>(t.id === v.id)) === i)),
        finalize(() => this.loadingService.loadingOff())
     )
      .subscribe(breweries => {
        this.breweries = breweries
        this.breweries$.next(breweries)
      });
  }

  getBreweryByIndex(index: number){
    this.brewery$.next([this.breweries[index]])
  }

  getCountryCodes(){
    this.http.get<BreweryLocationResponseModel>(`/api/locations/?key=659d5c6b8f3d2447f090119e48202fdb`)
      .pipe(
        map(locationResponse => locationResponse.data),
        // filtering out duplicates provided by location search response
        map( locations => locations.filter((v, i, a) => a.findIndex(t=>(t.countryIsoCode=== v.countryIsoCode)) === i)
          .sort((a, b) => a.name.localeCompare(b.name)),
        ))
      .subscribe(countryCodes => {
        this.countryCodes$.next(countryCodes)
      });
  }
}
