import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import {BeerModule} from "./beer/beer.module";
import {BreweryModule} from "./brewery/brewery.module";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BeerModule,
    BreweryModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
