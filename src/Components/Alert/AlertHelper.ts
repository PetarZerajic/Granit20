export enum DataType {
  Article = "Artikal",
  Invoice = "Račun",
  Customer = "Kupac",
  User = "Korisnik",
}

export enum ResponseStatus {
  Successful = "je uspešno",
  Unsuccessful = "je neuspešno",
  Error = "Greska",
  Not = "ne",
}
export enum ActionType {
  Add = "dodat",
  Update = "ažuriran",
  Exist = "postoji",
}

export const createAlertMessage = (
  dataType: DataType,
  responseStatus: ResponseStatus,
  actionType: ActionType
) => {
  return `${dataType} ${responseStatus} ${actionType}`;
};
