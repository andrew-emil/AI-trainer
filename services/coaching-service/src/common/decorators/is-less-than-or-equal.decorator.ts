import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from "class-validator";

@ValidatorConstraint({ name: "isLessThanOrEqual", async: false })
export class IsLessThanOrEqualConstraint implements ValidatorConstraintInterface {
    validate(value: any, args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        const relatedValue = (args.object as any)[relatedPropertyName];

        // If either value is not a number, we might skip validation or handle it.
        // Usually class-validator decorators are used alongside @IsInt or @IsNumber.
        if (typeof value !== "number" || typeof relatedValue !== "number") {
            return true; // Let other decorators handle non-number types
        }

        return value <= relatedValue;
    }

    defaultMessage(args: ValidationArguments) {
        const [relatedPropertyName] = args.constraints;
        return `${args.property} must be less than or equal to ${relatedPropertyName}`;
    }
}

export function IsLessThanOrEqual(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [property],
            validator: IsLessThanOrEqualConstraint,
        });
    };
}