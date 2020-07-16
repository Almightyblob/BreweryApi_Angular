import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrewerylistComponent } from './brewerylist/brewerylist.component';
import { BrewerydetailComponent } from './brewerydetail/brewerydetail.component';
import {BreweryRoutingModule} from "./brewery-routing.module";



@NgModule({
  declarations: [BrewerylistComponent, BrewerydetailComponent],
  imports: [
    CommonModule,
    BreweryRoutingModule
  ]
})
export class BreweryModule { }
