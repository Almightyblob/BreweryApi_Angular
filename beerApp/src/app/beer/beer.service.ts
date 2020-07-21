import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Subject} from "rxjs";
import {BeerResponseModel} from "../models/beer-response.model";
import {tap, map} from "rxjs/operators";
import {BeerModel} from "../models/beer.model";
import {SearchDataModel} from "../models/searchData.model";

@Injectable()
export class BeerService {

  searchData$ = new BehaviorSubject<SearchDataModel>(
    {  "currentPage": 0,
    "numberOfPages": 0,
    "totalResults": 0,})
  beers$ = new BehaviorSubject<BeerModel[]>([]);
  beer$ = new BehaviorSubject<BeerModel[]>([]);
  private beers: BeerModel[];



  constructor(private http: HttpClient) {
  }

  searchBeerName(keyword){
    this.http.get<BeerResponseModel>(`/api/beers?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`).
    pipe(
      tap(response => {
<<<<<<< HEAD
        let responseCopy = {...response}
        delete responseCopy.data
        console.log(responseCopy)
        this.searchData$.next(responseCopy);
=======
        delete response.data;
        this.searchData$.next(response);
>>>>>>> services
      }),
      map(response => response.data),
      tap(response => {
        console.log(response)
        this.beers = response
        this.beers$.next(response)
      })
    ).subscribe()
  }

  getBeerByIndex(index){
    this.beer$.next([this.beers[index]])
  }

}
