import {HttpClient} from "@angular/common/http";
import {BreweryModel} from "../models/brewery.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable()
export class BreweryService {
  constructor(private http: HttpClient) {
  }

  loadBreweries(): Observable<BreweryModel>{
    return this.http.get<BreweryModel>("/api/breweries/?key=659d5c6b8f3d2447f090119e48202fdb")
  }

}
