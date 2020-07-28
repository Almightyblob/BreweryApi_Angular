import {BreweryLocationModel} from './brewery-location.model';

export interface BreweryLocationResponseModel {
    'currentPage': number;
    'numberOfPages': number;
    'totalResults': number;
    'data': BreweryLocationModel[];

}
