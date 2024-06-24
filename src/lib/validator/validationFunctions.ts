import {
  ValidationArguments,
  ValidationError,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";
import { userDao } from "../../database/dao";

export const getFirstErrorConstraints = (
  err: ValidationError
): { [key: string]: string } | undefined => {
  let firstErrorConstraints: { [key: string]: string } | undefined;

  if (err.constraints) {
    firstErrorConstraints = err.constraints;
  } else if (err.children && err.children.length > 0) {
    firstErrorConstraints = getFirstErrorConstraints(err.children[0]);
  }

  return firstErrorConstraints;
};

@ValidatorConstraint({ async: false })
export class OneOfConstraint implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const [relatedProperties] = args.constraints;
    const object = args.object as Record<string, any>;

    return relatedProperties.some(
      (propertyName: string | number) =>
        object[propertyName] !== undefined && object[propertyName] !== null
    );
  }

  defaultMessage(args: ValidationArguments) {
    const [relatedProperties] = args.constraints;
    return `At least one of ${relatedProperties.join(", ")} must be provided`;
  }
}

@ValidatorConstraint({ async: true })
export class IsUniquePhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  async validate(phoneNumber: any) {
    if (!phoneNumber) return true;
    const user = await userDao.findByPhoneNumber(phoneNumber);
    return !user;
  }

  defaultMessage() {
    return "Phone number already in use";
  }
}

@ValidatorConstraint({ async: true })
export class IsUniqueBvnConstraint implements ValidatorConstraintInterface {
  async validate(bvn: any) {
    if (!bvn) return true;
    const user = await userDao.findByBvn(bvn);
    return !user;
  }

  defaultMessage() {
    return "BVN already in use";
  }
}

@ValidatorConstraint({ async: true })
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  async validate(email: any) {
    if (!email) return true;
    const user = await userDao.findByEmail(email);
    return !user;
  }

  defaultMessage() {
    return "Email already in use";
  }
}

@ValidatorConstraint({ async: false })
export class IsNigerianPhoneNumberConstraint
  implements ValidatorConstraintInterface
{
  validate(phoneNumber: any, args: ValidationArguments) {
    if (!phoneNumber) return true;

    const nigerianPhoneNumberRegex =
      /^(\+234)(701|702|703|704|705|706|707|708|709|802|803|804|805|806|807|808|809|810|811|812|813|814|815|816|817|818|819|909|908|901|902|903|904|905|906|907)([0-9]{7})$/;
    return nigerianPhoneNumberRegex.test(phoneNumber);
  }

  defaultMessage(args: ValidationArguments) {
    return "Invalid phone number";
  }
}
