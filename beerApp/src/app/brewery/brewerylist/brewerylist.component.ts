import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreweryModel} from "../../models/brewery.model";
import {BreweryService} from "../brewery.service";
import {Router} from "@angular/router";
import {SearchDataModel} from "../../models/searchData.model";

@Component({
  selector: 'app-brewerylist',
  templateUrl: './brewerylist.component.html',
  styleUrls: ['./brewerylist.component.css']
})
export class BrewerylistComponent implements OnInit {

  breweries$: Observable<BreweryModel[]>
  searchData$: Observable<SearchDataModel>


  constructor(private breweryService: BreweryService, private router: Router) { }

  ngOnInit(): void {
    this.breweries$ = this.breweryService.breweries$
    this.searchData$ = this.breweryService.searchData$
  }

  goToBrewery(index: number){
    this.breweryService.getBreweryByIndex(index)
    this.router.navigate(['brewery/detail'])
  }

}
