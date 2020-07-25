import {BeerModel} from "./beer.model";

export interface BeerResponseModel {
  "currentPage": number,
  "numberOfPages": number,
  "totalResults": number,
  "data": BeerModel[]
}
