export interface StyleModel {
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
