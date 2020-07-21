import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {BeerResponseModel} from "../models/beer-response.model";
import {tap, map} from "rxjs/operators";
import {BeerModel} from "../models/beer.model";
import {SearchDataModel} from "../models/searchData.model";
import {StylesResponseModel} from "../models/styles-response.model";
import {StyleModel} from "../models/style.model";

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



  constructor(private http: HttpClient) {
  }

  searchBeerName(keyword){
    this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`).
    pipe(
      tap(response => {
        let responseCopy = {...response}
        delete responseCopy.data
        console.log(responseCopy)
        this.searchData$.next(responseCopy);
      }),
      map(response => response.data),
      tap(response => {
        console.log(response)
        this.beers = response
        this.beers$.next(response)
      })
    ).subscribe()
  }

  searchBeerType(keyword){
    this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`).
    pipe(
      tap(response => {
        let responseCopy = {...response}
        delete responseCopy.data
        console.log(responseCopy)
        this.searchData$.next(responseCopy);
      }),
      map(response => response.data),
      tap(response => {
        console.log(response)
        this.beers = response
        this.beers$.next(response)
      })
    ).subscribe()
  }

  getAllStyles(){
  this.http.get<StylesResponseModel>(`/api/styles?key=659d5c6b8f3d2447f090119e48202fdb`).
    pipe(
      map(stylesResponse => stylesResponse.data)
  ).subscribe(styles => this.styles$.next(styles))
  }

  getBeerByIndex(index){
    this.beer$.next([this.beers[index]])
  }

}
