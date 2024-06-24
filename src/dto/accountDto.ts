import {
  IsNotEmpty,
  IsString,
  Length,
  Matches,
  IsUUID,
  IsOptional,
} from "class-validator";

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
