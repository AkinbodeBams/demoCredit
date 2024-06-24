import {
  ValidationOptions,
  ValidatorConstraintInterface,
  registerDecorator,
} from "class-validator";
import {
  IsNigerianPhoneNumberConstraint,
  IsUniqueBvnConstraint,
  IsUniqueEmailConstraint,
  IsUniquePhoneNumberConstraint,
  OneOfConstraint,
} from "./validationFunctions";

export function OneOf(
  properties: string[],
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [properties],
      validator: OneOfConstraint,
    });
  };
}

export function isCustomUnique(
  validator: ValidatorConstraintInterface,
  validationOptions?: ValidationOptions
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator,
    });
  };
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
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

export function IsUniqueBvn(validationOptions?: ValidationOptions) {
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

export function IsUniquePhoneNumber(validationOptions?: ValidationOptions) {
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

export function IsNigerianPhoneNumber(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNigerianPhoneNumberConstraint,
    });
  };
}
