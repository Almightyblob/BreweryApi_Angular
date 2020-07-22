import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreweryModel} from "../../models/brewery.model";
import {BreweryService} from "../brewery.service";
import {BeerService} from "../../beer/beer.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-brewerydetail',
  templateUrl: './brewerydetail.component.html',
  styleUrls: ['./brewerydetail.component.css']
})
export class BrewerydetailComponent implements OnInit {

  brewery$: Observable<BreweryModel[]>

  constructor(private breweryService: BreweryService,
              private beerService: BeerService,
              private router: Router) { }

  ngOnInit(): void {
    this.brewery$ = this.breweryService.brewery$
  }

  goToBreweryBeers(id){
    this.beerService.getBreweryBeers(id);
    this.router.navigate(['/beer'])

  }

}
