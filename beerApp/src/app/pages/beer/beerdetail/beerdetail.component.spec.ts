import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BeerdetailComponent} from './beerdetail.component';

describe('BeerdetailComponent', () => {
    let component: BeerdetailComponent;
    let fixture: ComponentFixture<BeerdetailComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BeerdetailComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BeerdetailComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
