import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BrewerylistComponent} from './brewerylist.component';

describe('BrewerylistComponent', () => {
    let component: BrewerylistComponent;
    let fixture: ComponentFixture<BrewerylistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [BrewerylistComponent]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BrewerylistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
