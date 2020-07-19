export interface BreweryModel {
  "currentPage": number,
  "numberOfPages": number,
  "totalResults": number,
  "data": [
    {
      "id": string,
      "name": string,
      "nameShortDisplay": string,
      "description": string,
      "website": string,
      "established": string,
      "isOrganic": string,
      "images": {
        "icon": string,
        "medium": string,
        "large": string,
        "squareMedium": string,
        "squareLarge": string
      }
    }
  ],
  "status": "success"
}
