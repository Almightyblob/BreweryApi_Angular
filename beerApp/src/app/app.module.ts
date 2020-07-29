import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {NavbarComponent} from './components/navbar/navbar.component';
import {HomeComponent} from './components/home/home.component';
import {BeerModule} from './beer/beer.module';
import {BreweryModule} from './brewery/brewery.module';
import {BeerService} from './beer/beer.service';
import {BreweryService} from './brewery/brewery.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import {LoadingComponent} from './components/loading/loading.component';
import {LoadingService} from './components/loading/loading.service';


@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        HomeComponent,
        LoadingComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        BeerModule,
        BreweryModule,

    ],
    providers: [BeerService, BreweryService, LoadingService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
