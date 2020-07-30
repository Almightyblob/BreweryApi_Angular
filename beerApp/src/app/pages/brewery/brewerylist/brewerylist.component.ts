import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {BreweryModel} from '../../../models/Brewery/brewery.model';
import {BreweryService} from '../../../services/brewery.service';
import {Router} from '@angular/router';
import {SearchDataModel} from '../../../models/searchData.model';
import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

@Component({
    selector: 'app-brewerylist',
    templateUrl: './brewerylist.component.html',
    styleUrls: ['./brewerylist.component.scss'],
    animations: [
        trigger('listAnimation', [
            transition('* => *', [ // each time the binding value changes
                query(':enter', [
                    style({opacity: 0}),
                    stagger(30, [
                        animate('0.5s', style({opacity: 1}))
                    ])
                ], {optional: true})
            ])
        ])
    ]
})
export class BrewerylistComponent implements OnInit {

    breweries$: Observable<BreweryModel[]>;
    searchData$: Observable<SearchDataModel>;

    constructor(private breweryService: BreweryService, private router: Router) {
    }

    ngOnInit(): void {
        this.breweries$ = this.breweryService.breweries$;
        this.searchData$ = this.breweryService.searchData$;
    }

    goToBrewery(index: number): void {
        this.breweryService.getBreweryByIndex(index);
        this.router.navigate(['brewery/detail']);
    }

}
