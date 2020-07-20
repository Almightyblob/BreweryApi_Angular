import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {FormBuilder, FormGroup} from "@angular/forms";

import {BreweryService} from "../../brewery/"

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

  constructor(private fb: FormBuilder, private breweryService: BreweryS) {
    this.breweryForm = fb.group({
      breweryName: [],
      breweryCountry: [],
    })
  }

  onAnimate(){
    this.state == 'off' ? this.state = 'on' : this.state = 'off'
  }

  ngOnInit(): void {
  }

  onBrewerySearch(){
    this.onAnimate()
    this.brewerySearchOn = true;
    this.beerSearchOn = false;
  }

  onBeerSearch(){
    this.onAnimate()
    this.beerSearchOn = true;
    this.brewerySearchOn = false;
  }

}
