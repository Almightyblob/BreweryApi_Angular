import {HttpClient} from "@angular/common/http";
import {BreweryModel} from "../models/brewery.model";
import {Injectable} from "@angular/core";
import {BehaviorSubject, Observable, Subject} from "rxjs";
import {BreweryResponseModel} from "../models/brewery-response.model";
import {map, tap} from "rxjs/operators";
import {BreweryLocationResponseModel} from "../models/brewery-location-response.model";

@Injectable()
export class BreweryService {
  breweries$ = new BehaviorSubject<BreweryModel[]>([]);
  brewery$ = new BehaviorSubject<BreweryModel[]>([])
  private breweries: BreweryModel[]
  countryCodes$ = new BehaviorSubject([])

  constructor(private http: HttpClient) {
  }

  breweryNameSearch(keyword){
    this.http.get<BreweryResponseModel>(`/api/breweries/?key=659d5c6b8f3d2447f090119e48202fdb&name=${keyword}`)
      .pipe(
        map(breweryResponse => breweryResponse.data),
        tap( breweries => this.breweries = breweries)
      )
      .subscribe((breweries: BreweryModel[]) => this.breweries$.next(breweries))
  }

  breweryCountrySearch(keyword){
    this.http.get<BreweryLocationResponseModel>(`/api/locations/?key=659d5c6b8f3d2447f090119e48202fdb&countryIsoCode=${keyword}`)
      .pipe(
        map(locationResponse => locationResponse.data.map(locations => locations.brewery)),
        // filtering out duplicates provided by location search response
        map( breweries => breweries.filter((v, i, a) => a.findIndex(t=>(t.id === v.id)) === i)
          .sort((a, b) => a.name.localeCompare(b.name))),
        tap(breweries => this.breweries = breweries))
      .subscribe(breweries => this.breweries$.next(breweries));
  }

  getBreweryByIndex(index){
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
        console.log(countryCodes)
        this.countryCodes$.next(countryCodes)
      });
  }
}
