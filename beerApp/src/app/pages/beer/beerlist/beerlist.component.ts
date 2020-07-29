import {Component, OnInit} from '@angular/core';
import {BeerService} from '../beer.service';
import {BeerModel} from '../../../models/Beer/beer.model';
import {Observable} from 'rxjs';
import {Router} from '@angular/router';
import {SearchDataModel} from '../../../models/searchData.model';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-beerlist',
    templateUrl: './beerlist.component.html',
    styleUrls: ['./beerlist.component.scss'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [ // each time the binding value changes
                query(':enter', [
                    style({opacity: 0}),
                    stagger(30, [
                        animate('0.5s ease-in', style({opacity: 1}))
                    ])
                ], {optional: true})
            ])
        ])
    ]
})
export class BeerlistComponent implements OnInit {

    beers$: Observable<BeerModel[]>;
    searchData$: Observable<SearchDataModel>;

    constructor(private beerService: BeerService, private router: Router) {
    }

    ngOnInit(): void {
        this.beers$ = this.beerService.beers$;
        this.searchData$ = this.beerService.searchData$;
    }

    onGoToBeer(index: number): void {
        this.beerService.getBeerByIndex(index);
        this.router.navigate(['beer/detail']);
    }

    beerPageChange(page: number | string): void {
        this.beerService.beerPageChange(page);
    }
}
