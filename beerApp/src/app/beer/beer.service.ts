import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Subject} from "rxjs";
import {BeerResponseModel} from "../models/beer-response.model";
import {tap, map} from "rxjs/operators";
import {BeerModel} from "../models/beer.model";

@Injectable()
export class BeerService {

  beers$ = new Subject<BeerModel[]>();


  constructor(private http: HttpClient) {
  }

  loadBeers(){
    this.http.get<BeerResponseModel>("/api/beers?key=659d5c6b8f3d2447f090119e48202fdb").
    pipe(
      map(response => response.data),
      tap(response => this.beers$.next(response))
    ).subscribe()
  }

}
