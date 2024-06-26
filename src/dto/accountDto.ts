import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsOptional,
  Min,
  IsNumber,
  IsEnum,
  Max,
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

export class FundDto {
  constructor(source: "loan" | "external", amount: number) {
    this.source = source;
    this.amount = amount;
  }

  @IsNotEmpty()
  @Min(50, {
    message: "amount must be between 50 and 10,000,000,000 Naira",
  })
  @Max(10000000000, {
    message: "amount must be between 50 and 10,000,000,000 Naira",
  })
  @IsNumber()
  amount!: number;

  @IsNotEmpty()
  @IsEnum(["loan", "external"], {
    message: "source must be either loan or external",
  })
  source!: "loan" | "external";
}
export class WithdrawAccountDto {
  constructor(amount: number) {
    this.amount = amount;
  }
  @IsNotEmpty()
  @Min(50, {
    message: "amount must be between 50 and 10,000,000,000 Naira",
  })
  @Max(10000000000, {
    message: "amount must be between 50 and 10,000,000,000 Naira",
  })
  @IsNumber()
  amount!: number;
}

export class TransferFundDto {
  constructor(recipientAccountNumber: string) {
    this.recipientAccountNumber = recipientAccountNumber;
  }
  @IsNotEmpty()
  @IsString()
  @Length(10, 10, {
    message: "Account number must be exactly 10 characters long",
  })
  recipientAccountNumber!: string;

  @IsNotEmpty()
  @Min(50, {
    message: "amount must be between 50 and 10,000,000,000 Naira",
  })
  @Max(10000000000, {
    message: "amount must be between 50 and 10,000,000,000 Naira",
  })
  @IsNumber()
  amount!: number;
}
