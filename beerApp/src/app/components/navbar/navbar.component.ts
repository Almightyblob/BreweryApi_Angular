import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup} from "@angular/forms";

import {BreweryService} from "../../brewery/brewery.service"
import {BeerService} from "../../beer/beer.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {StyleModel} from "../../models/style.model";
import {BreweryLocationResponseModel} from "../../models/brewery-location-response.model";
import {BreweryLocationModel} from "../../models/brewery-location.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations: [
    trigger('divState', [
      transition('void => *', [style({opacity: 0, height: 0}), animate(150)])
    ])
  ]
  })
export class NavbarComponent implements OnInit {

  beerForm: FormGroup;
  breweryForm: FormGroup
  brewerySearchOn = false;
  beerSearchOn = false ;
  state = 'off'
  styles$: Observable<StyleModel[]>
  countryCodes$: Observable<BreweryLocationModel[]>

  constructor(private fb: FormBuilder,
              private breweryService: BreweryService,
              private beerService: BeerService,
              private router: Router) {

    this.breweryForm = fb.group({
      breweryName: [''],
      breweryCountry: [''],
    });

    this.beerForm = fb.group({
      beerName: [''],
      beerStyle: [''],
      beerCountry: [''],
    })
  }

  onAnimate(){
    this.state == 'off' ? this.state = 'on' : this.state = 'off'
  }

  ngOnInit(): void {
    this.styles$ = this.beerService.styles$
    this.countryCodes$ = this.breweryService.countryCodes$
    this.beerService.getAllStyles()
    this.breweryService.getCountryCodes()

  }

  openBreweryForm(){
    this.onAnimate()
    this.brewerySearchOn = true;
    this.beerSearchOn = false;
  }

  openBeerForm(){
    this.onAnimate()
    this.beerSearchOn = true;
    this.brewerySearchOn = false;
  }

  onBreweryNameSearch(){
    this.breweryService.breweryNameSearch(this.breweryForm.value.breweryName)
    this.router.navigate(['/brewery'])
  }

  onBreweryCountrySearch(){
    this.breweryService.breweryCountrySearch(this.breweryForm.value.breweryCountry)
    this.router.navigate(['/brewery'])
  }

  onBeerNameSearch(){
    this.beerService.searchBeerName(this.beerForm.value.beerName);
    this.router.navigate(['/beer'])
  }

  onBeerStyleSearch(){
    this.beerService.searchBeerStyle(this.beerForm.value.beerStyle);
    this.router.navigate(['/beer'])
  }

}
