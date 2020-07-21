export interface BreweryLocationResponseModel{
  "currentPage": number,
  "numberOfPages": number,
  "totalResults": number,
  "data": [
    {
      "id": string,
      "name": string,
      "streetAddress": string,
      "locality": string,
      "region": string,
      "postalCode": string,
      "latitude": number,
      "longitude": number,
      "isPrimary": string,
      "inPlanning": string,
      "isClosed": string,
      "openToPublic": string,
      "locationType": string,
      "locationTypeDisplay": string,
      "countryIsoCode": string,
      "status": string,
      "statusDisplay": string,
      "createDate": string,
      "updateDate": string,
      "timezoneId": string,
      "breweryId": string,
      "brewery": {
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
        },
        "status": string,
        "statusDisplay": string,
        "createDate": string,
        "updateDate": string,
        "isMassOwned": string,
        "isInBusiness": string,
        "isVerified": string
      },
      "country": {
        "isoCode": string,
        "name": string,
        "displayName": string,
        "isoThree": string,
        "numberCode": number,
        "createDate": string
      }
    }
  ]
}
