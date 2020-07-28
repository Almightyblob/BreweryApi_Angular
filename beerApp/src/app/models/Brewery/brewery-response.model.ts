import {BreweryModel} from './brewery.model';

export interface BreweryResponseModel {
    'currentPage': number;
    'numberOfPages': number;
    'totalResults': number;
    'data': BreweryModel[];
    'status': 'success';
}
