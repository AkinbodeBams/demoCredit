export interface updateAccountDto {
  balance: number;
  accountNumber?: string;
  isActive?: boolean;
}

export enum source {
  loan = "loan",
  transfer = "transfer",
  others = "others",
}
