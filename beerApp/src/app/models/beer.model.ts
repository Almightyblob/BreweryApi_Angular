export interface BeerModel
    {
      "id": string,
      "name": string,
      "nameDisplay": string,
      "abv": string,
      "glasswareId": 4,
      "styleId": 98,
      "isOrganic": string,
      "isRetired": string,
      "labels": {
        "icon": string,
        "medium?": string,
        "large": string,
        "contentAwareIcon": string,
        "contentAwareMedium": string,
        "contentAwareLarge": string
      },
      "status": string,
      "statusDisplay": string,
      "createDate": string,
      "updateDate": string,
      "glass": {
        "id": number,
        "name": string,
        "createDate": string
      },
      "style": {
        "id": number,
        "categoryId": number,
        "category": {
          "id": number,
          "name": string,
          "createDate": string
        },
        "name": string,
        "shortName": string,
        "description": string,
        "ibuMin": string,
        "ibuMax": string,
        "abvMin": string,
        "abvMax": string,
        "srmMin": string,
        "srmMax": string,
        "ogMin": string,
        "fgMin": string,
        "fgMax": string,
        "createDate": string,
        "updateDate": string
      }
    }

