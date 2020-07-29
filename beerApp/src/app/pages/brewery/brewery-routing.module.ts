import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BrewerylistComponent} from './brewerylist/brewerylist.component';
import {BrewerydetailComponent} from './brewerydetail/brewerydetail.component';


const routes: Routes = [
        {path: '', component: BrewerylistComponent},
        {path: 'detail', component: BrewerydetailComponent}
    ]
;

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BreweryRoutingModule {
}
