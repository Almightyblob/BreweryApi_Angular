import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BeerlistComponent} from "./beerlist/beerlist.component";
import {BeerdetailComponent} from "./beerdetail/beerdetail.component";


const routes: Routes = [
  {path: '', pathMatch: 'full', component: BeerlistComponent},
  {path: 'detail', component: BeerdetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeerRoutingModule { }
