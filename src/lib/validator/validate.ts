import { ClassConstructor, plainToClass } from "class-transformer";
import {
  validate as classValidatorValidate,
  ValidatorOptions,
} from "class-validator";
import { httpErrors } from "../errorHandler";
import { getFirstErrorConstraints } from "./validationFunctions";

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
