import { Component, OnInit } from '@angular/core';
import {BeerService} from "../beer.service";
import {BeerModel} from "../../models/beer.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Component({
  selector: 'app-beerlist',
  templateUrl: './beerlist.component.html',
  styleUrls: ['./beerlist.component.css']
})
export class BeerlistComponent implements OnInit {

  beers$: Observable<BeerModel[]>

  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.beers$ = this.beerService.beers$
    this.beerService.loadBeers()
  }



}
