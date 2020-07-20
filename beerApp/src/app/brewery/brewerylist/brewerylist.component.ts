import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {BreweryModel} from "../../models/brewery.model";
import {BreweryService} from "../brewery.service";

@Component({
  selector: 'app-brewerylist',
  templateUrl: './brewerylist.component.html',
  styleUrls: ['./brewerylist.component.css']
})
export class BrewerylistComponent implements OnInit {

  breweries$: Observable<BreweryModel[]>

  constructor(private breweryService: BreweryService) { }

  ngOnInit(): void {
    this.breweries$ = this.breweryService.breweries$
  }

}
