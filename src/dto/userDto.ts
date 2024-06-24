// src/dtos/userDTO.ts
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Matches,
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { UserDAO } from "../database/daos/userDaos";
import { OneOf } from "../lib/validator";

@ValidatorConstraint({ async: true })
class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(email: any) {
    if (!email) return true;
    const user = await UserDAO.findByEmail(email);
    return !user;
  }

  defaultMessage() {
    return "Email already in use";
  }
}

function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
class IsUniquePhoneNumberConstraint implements ValidatorConstraintInterface {
  async validate(phoneNumber: any) {
    if (!phoneNumber) return true;
    const user = await UserDAO.findByPhoneNumber(phoneNumber);
    return !user;
  }

  defaultMessage() {
    return "Phone number already in use";
  }
}

function IsUniquePhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniquePhoneNumberConstraint,
    });
  };
}

@ValidatorConstraint({ async: true })
class IsUniqueBvnConstraint implements ValidatorConstraintInterface {
  async validate(bvn: any) {
    const user = await UserDAO.findByBvn(bvn);
    return !user;
  }

  defaultMessage() {
    return "BVN already in use";
  }
}

function IsUniqueBvn(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueBvnConstraint,
    });
  };
}

export class CreateUserDTO {
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
  @IsUniquePhoneNumber({ message: "Phone number already exists" })
  phoneNumber?: string | null;

  @IsNotEmpty()
  @IsString()
  @Length(11, 11, { message: "BVN must be exactly 11 characters long" })
  @Matches(/^\d+$/, { message: "BVN must contain only numbers" })
  @IsUniqueBvn({ message: "BVN already exists" })
  bvn!: string;

  @OneOf(["email", "phoneNumber"], {
    message: "At least one of email or phone number must be provided",
  })
  contactInfo: string;
}
