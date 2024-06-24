import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
} from "class-validator";

import {
  IsNigerianPhoneNumber,
  IsUniqueBvn,
  IsUniqueEmail,
  IsUniquePhoneNumber,
  OneOf,
} from "../lib/validator";

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: "BVN must be exactly 11 characters long" })
  @Matches(/^\d+$/, { message: "BVN must contain only numbers" })
  @IsUniqueBvn({ message: "BVN already exists" })
  bvn!: string;

  @IsNotEmpty()
  @IsString()
  firstName!: string;

  @IsNotEmpty()
  @IsString()
  lastName!: string;

  @IsOptional()
  @IsEmail()
  @IsUniqueEmail({ message: "Email already exists" })
  email?: string | null;

  @IsOptional()
  @IsString()
  @IsNigerianPhoneNumber({ message: "Invalid phone number" })
  @IsUniquePhoneNumber({ message: "Phone number already exists" })
  phoneNumber?: string | null;

  @OneOf(["email", "phoneNumber"], {
    message: "At least one of email or phone number must be provided",
  })
  contactInfo: string;
}
