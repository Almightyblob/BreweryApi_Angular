import {Component, OnInit} from '@angular/core';
import {BeerModel} from "../../models/Beer/beer.model";
import {Observable} from "rxjs";
import {BeerService} from "../beer.service";

@Component({
  selector: 'app-beerdetail',
  templateUrl: './beerdetail.component.html',
  styleUrls: ['./beerdetail.component.css']
})
export class BeerdetailComponent implements OnInit {

  beer$: Observable<BeerModel[]>;

  constructor(private beerService: BeerService) { }

  ngOnInit(): void {
    this.beer$ = this.beerService.beer$
  }

}
