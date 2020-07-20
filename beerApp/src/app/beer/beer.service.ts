import {HttpClient} from "@angular/common/http";
import {BeerModel} from "../models/beer.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class BeerService {
  constructor(private http: HttpClient) {
  }

  loadBeers(): Observable<BeerModel>{
    return this.http.get<BeerModel>("/api/beers?key=659d5c6b8f3d2447f090119e48202fdb")
  }

}
