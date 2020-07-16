import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerlistComponent } from './beerlist/beerlist.component';
import { BeerdetailComponent } from './beerdetail/beerdetail.component';
import {BeerRoutingModule} from "./beer-routing.module";

@NgModule({
  declarations: [BeerlistComponent, BeerdetailComponent],
  imports: [
    CommonModule,
    BeerRoutingModule
  ]
})
export class BeerModule { }
