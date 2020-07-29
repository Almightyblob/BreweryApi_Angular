import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './pages/home/home.component';


const routes: Routes = [
    {path: '', pathMatch: 'full', component: HomeComponent},
    {path: 'beer', loadChildren: () => import('./pages/beer/beer.module').then(x => x.BeerModule)},
    {path: 'brewery', loadChildren: () => import('./pages/brewery/brewery.module').then(x => x.BreweryModule)},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
