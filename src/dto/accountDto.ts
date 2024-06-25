import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsOptional,
  Min,
  IsNumber,
} from "class-validator";
import { updateAccountDto } from "./types";

export class CreateAccountDto {
  constructor(userId: string, accountNumber: string) {
    this.userId = userId;
    this.accountNumber = accountNumber;
  }

  @IsNotEmpty()
  @IsString()
  userId!: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10, {
    message: "Account number must be exactly 10 characters long",
  })
  @Matches(/^\d+$/, { message: "Account number must contain only numbers" })
  accountNumber!: string;

  @IsOptional()
  balance?: number;

  @IsOptional()
  isActive?: boolean;
}

export class UpdateAccountDtoClass implements updateAccountDto {
  balance: number;
  accountNumber?: string;
  isActive?: boolean;

  constructor(data: updateAccountDto) {
    this.balance = data.balance;
    this.accountNumber = data.accountNumber;
    this.isActive = data.isActive;
  }
}

export class FundAndWithdrawAccountDto {
  constructor(accountNumber: string, amount: number) {
    this.accountNumber = accountNumber;
    this.amount = amount;
  }
  @IsNotEmpty()
  @Min(0.5) // changeable
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsString()
  @Length(10, 10, {
    message: "Account number must be exactly 10 characters long",
  })
  @Matches(/^\d+$/, { message: "Account number must contain only numbers" })
  accountNumber!: string;
}

export class TransferFundDto {
  constructor(sender: string, recipient: string) {
    this.sender = sender;
    this.recipient = recipient;
  }
  @IsNotEmpty()
  @IsString()
  @Length(10, 10, {
    message: "Account number must be exactly 10 characters long",
  })
  sender!: string;
  recipient!: string;

  @IsNotEmpty()
  @Min(0.5) // changeable
  @IsNumber()
  amount!: number;
}
