import {HttpClient} from "@angular/common/http";
import {BreweryModel} from "../models/brewery.model";
import {Injectable} from "@angular/core";
import {Observable, Subject} from "rxjs";
import {BreweryResponseModel} from "../models/brewery-response.model";
import {map} from "rxjs/operators";


@Injectable()
export class BreweryService {
  breweries$ = new Subject<BreweryModel[]>();

  constructor(private http: HttpClient) {
  }

  breweryNameSearch(searchWord){
    this.http.get<BreweryResponseModel>(`/api/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&name=${searchWord}`)
      .pipe(
        map(response => response.data)
      )
      .subscribe(breweries => this.breweries$.next(breweries))
  }

  breweryCountrySearch(searchWord){
    this.http.get<BreweryResponseModel>(`/api/locations/?key=659d5c6b8f3d2447f090119e48202fdb&countryIsoCode=${searchWord}`)
      .pipe(
        map(response => response.data)
      )
      .subscribe(breweries => this.breweries$.next(breweries))
  }

}
