import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {BeerResponseModel} from "../models/beer-response.model";
import {tap, map, finalize} from "rxjs/operators";
import {BeerModel} from "../models/beer.model";
import {SearchDataModel} from "../models/searchData.model";
import {StylesResponseModel} from "../models/styles-response.model";
import {StyleModel} from "../models/style.model";
import {LoadingService} from "../components/loading/loading.service";

@Injectable()
export class BeerService {

  searchData$ = new BehaviorSubject<SearchDataModel>(
    {  "currentPage": 0,
    "numberOfPages": 0,
    "totalResults": 0,})
  beers$ = new BehaviorSubject<BeerModel[]>([]);
  beer$ = new BehaviorSubject<BeerModel[]>([]);
  styles$ = new BehaviorSubject<StyleModel[]>([])
  private beers: BeerModel[];

  constructor(private http: HttpClient, private loadingService: LoadingService) {
  }

  extractSearchData(response){
    let responseCopy = {...response}
    delete responseCopy.data
    this.searchData$.next(responseCopy);
  }

  searchBeerName(keyword: string){
    this.loadingService.loadingOn()
    this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`).
    pipe(
      tap(beerResponse => {
        this.extractSearchData(beerResponse)
      }),
      map(beerResponse => beerResponse.data),
      finalize(() => this.loadingService.loadingOff())
    ).subscribe(beers => {
      this.beers = beers
      this.beers$.next(beers)
    })
  }

  searchBeerStyle(keyword: string){
    this.loadingService.loadingOn()
    this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&styleId=${keyword}`).
    pipe(
      tap(beerResponse => {
        this.extractSearchData(beerResponse)
      }),
      map(beerResponse => beerResponse.data),
      finalize(() => this.loadingService.loadingOff())
    ).subscribe(beers => {
      this.beers = beers
      this.beers$.next(beers)
    })
  }

  getBreweryBeers(breweryId: string){
    this.loadingService.loadingOn()
    this.http.get<BeerResponseModel>(`/api/brewery/${breweryId}/beers?key=659d5c6b8f3d2447f090119e48202fdb`).
    pipe(
      tap(beerResponse => {
        this.extractSearchData(beerResponse)
      }),
      map(beerResponse => beerResponse.data),
      finalize(() => this.loadingService.loadingOff())
    ).subscribe(beers => {
      this.beers = beers
      this.beers$.next(beers)
    })
  }

  beerPageChange(nextPage: string | number){
    this.loadingService.loadingOn()
    this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&p=${nextPage}`).
    pipe(
      tap(beerResponse => {
        this.extractSearchData(beerResponse)
      }),
      map(beerResponse => beerResponse.data),
      finalize(() => this.loadingService.loadingOff())
    ).subscribe(beers => {
      this.beers = beers
      this.beers$.next(beers)
    })
  }

  getAllStyles(){
  this.http.get<StylesResponseModel>(`/api/styles?key=659d5c6b8f3d2447f090119e48202fdb`).
    pipe(
      map(stylesResponse => stylesResponse.data)
  ).subscribe(styles => this.styles$.next(styles))
  }

  getBeerByIndex(index: number){
    this.beer$.next([this.beers[index]])
  }

}
