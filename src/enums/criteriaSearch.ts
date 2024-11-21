export enum CriteriaSearch {
  ContractAccount = "CUENTA_CONTRATO",
  Id = "IDENTIFICACION",
  AccountCode = "CUEN",
}

export const criteriaSearchLabels = [
  { value: CriteriaSearch.ContractAccount, label: "Cuenta de Contrato" },
  { value: CriteriaSearch.Id, label: "Identificación" },
  { value: CriteriaSearch.AccountCode, label: "Código de Cuenta" },
];
