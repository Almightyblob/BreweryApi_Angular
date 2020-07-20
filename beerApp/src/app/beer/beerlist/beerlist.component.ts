import { Component, OnInit } from '@angular/core';
import {BeerService} from "../beer.service";
import {BeerModel} from "../../models/beer.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Component({
  selector: 'app-beerlist',
  templateUrl: './beerlist.component.html',
  styleUrls: ['./beerlist.component.css']
})
export class BeerlistComponent implements OnInit {

  beers$: Observable<BeerModel[]>
  searchData$


  constructor(private beerService: BeerService, private router: Router) { }

  ngOnInit(): void {
    this.beers$ = this.beerService.beers$
    this.searchData$ = this.beerService.searchData$
  }

  onGoToBeer(index){
    this.beerService.getBeerByIndex(index);
    this.router.navigate(['detail'])
  }

}
