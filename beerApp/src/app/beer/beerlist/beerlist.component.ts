import { Component, OnInit } from '@angular/core';
import {BeerService} from "../beer.service";
import {BeerModel} from "../../models/beer.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {BeerResponseModel} from "../../models/beer-response.model";
import {SearchDataModel} from "../../models/searchData.model";

@Component({
  selector: 'app-beerlist',
  templateUrl: './beerlist.component.html',
  styleUrls: ['./beerlist.component.css']
})
export class BeerlistComponent implements OnInit {

  beers$: Observable<BeerModel[]>
  searchData$: Observable<SearchDataModel>


  constructor(private beerService: BeerService, private router: Router) { }

  ngOnInit(): void {
    this.beers$ = this.beerService.beers$
    this.searchData$ = this.beerService.searchData$
  }

  onGoToBeer(index){
    this.beerService.getBeerByIndex(index);
    this.router.navigate(['detail'])
  }

  beerPageChange(page){
    this.beerService.beerPageChange(page)
  }
}
