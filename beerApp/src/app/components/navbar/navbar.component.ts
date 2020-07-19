import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";

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

  brewerySearchOn = false;
  beerSearchOn = false ;
  state = 'off'

  onAnimate(){
    this.state == 'off' ? this.state = 'on' : this.state = 'off'
  }

  constructor() { }

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
