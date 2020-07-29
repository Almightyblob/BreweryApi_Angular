import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {BreweryService} from '../../brewery/brewery.service';
import {BeerService} from '../../beer/beer.service';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {StyleModel} from '../../models/Style/style.model';
import {BreweryLocationModel} from '../../models/Brewery/brewery-location.model';
import {LoadingService} from '../loading/loading.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

    beerForm: FormGroup;
    breweryForm: FormGroup;
    brewerySearchOn = false;
    beerSearchOn = false;
    styles$: Observable<StyleModel[]>;
    loading$: Observable<boolean>;
    countryCodes$: Observable<BreweryLocationModel[]>;

    constructor(private fb: FormBuilder,
                private breweryService: BreweryService,
                private beerService: BeerService,
                private loadingService: LoadingService,
                private router: Router) {

        this.breweryForm = fb.group({
            breweryName: [''],
            breweryCountry: [''],
        });

        this.beerForm = fb.group({
            beerName: [''],
            beerStyle: ['']
        });
    }

    ngOnInit(): void {
        this.loading$ = this.loadingService.loading$;
        this.styles$ = this.beerService.styles$;
        this.countryCodes$ = this.breweryService.countryCodes$;
        this.beerService.getAllStyles();
        this.breweryService.getCountryCodes();

    }

    openBreweryForm(): void {
        this.brewerySearchOn = true;
        this.beerSearchOn = false;
    }

    openBeerForm(): void {
        this.beerSearchOn = true;
        this.brewerySearchOn = false;
    }

    onBreweryNameSearch(): void {
        this.breweryService.breweryNameSearch(this.breweryForm.value.breweryName);
        this.router.navigate(['/brewery']);
    }

    onBreweryCountrySearch(): void {
        this.breweryService.breweryCountrySearch(this.breweryForm.value.breweryCountry);
        this.router.navigate(['/brewery']);
    }

    onBeerNameSearch(): void {
        this.beerService.searchBeerName(this.beerForm.value.beerName);
        this.router.navigate(['/beer']);
    }

    onBeerStyleSearch(): void {
        this.beerService.searchBeerStyle(this.beerForm.value.beerStyle);
        this.router.navigate(['/beer']);
    }

    navigateHome(): void {
        this.router.navigate(['']);
    }

}
