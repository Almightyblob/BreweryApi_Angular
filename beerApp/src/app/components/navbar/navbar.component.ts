import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup} from "@angular/forms";

import {BreweryService} from "../../brewery/brewery.service"
import {BeerService} from "../../beer/beer.service";
import {Router} from "@angular/router";

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
      beerType: [''],
      beerCountry: [''],
    })
  }

  onAnimate(){
    this.state == 'off' ? this.state = 'on' : this.state = 'off'
  }

  ngOnInit(): void {
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

  onBrewerySearch(){
    this.breweryService.breweryNameSearch(this.breweryForm.value.breweryName)
    this.router.navigate(['/brewery'])
  }

  onBeerSearch(){
    this.beerService.searchBeerName(this.beerForm.value.beerName);
    this.router.navigate(['/beer'])
  }

}
