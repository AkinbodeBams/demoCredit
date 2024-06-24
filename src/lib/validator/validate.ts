/* istanbul ignore file */
import { ClassConstructor, plainToClass } from "class-transformer";
import {
  validate as classValidatorValidate,
  ValidationError as ClassValidatorValidationError,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidatorOptions,
} from "class-validator";
import { httpErrors } from "../errorHandler";

export const getFirstErrorConstraints = (
  err: ClassValidatorValidationError
): { [key: string]: string } | undefined => {
  let firstErrorConstraints: { [key: string]: string } | undefined;

  if (err.constraints) {
    firstErrorConstraints = err.constraints;
  } else if (err.children && err.children.length > 0) {
    firstErrorConstraints = getFirstErrorConstraints(err.children[0]);
  }

  return firstErrorConstraints;
};

export const validate = async <T>(
  data: unknown,
  type: ClassConstructor<T>,
  validatorOptions: ValidatorOptions = {}
): Promise<T> => {
  const dto = plainToClass<T, unknown>(type, data);

  const errors = await classValidatorValidate(dto as Record<string, unknown>, {
    validationError: { target: false },
    whitelist: true,
    forbidNonWhitelisted: true,
    ...validatorOptions,
  });

  if (errors.length > 0) {
    const errorMessages: string[] = [];
    errors.forEach((err) => {
      const firstErrorConstraints = getFirstErrorConstraints(err);
      if (firstErrorConstraints) {
        errorMessages.push(...Object.values(firstErrorConstraints));
      }
    });
    throw new httpErrors.ValidationError(errorMessages.reverse()[0]);
  }

  return dto;
};

@ValidatorConstraint({ async: false })
class OneOfConstraint implements ValidatorConstraintInterface {
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
