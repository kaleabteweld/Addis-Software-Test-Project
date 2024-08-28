import { ValidationErrorFactory } from "../Types/error";
import Joi from "joi";


export function copyObjectWithOnlyKeys(obj: any, keys: string[]) {
    return keys.reduce((acc: any, key) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}
export function copyObjectWithout(obj: any, keysToRemove: string[]) {
    const keysToKeep = Object.keys(obj).filter(key => !keysToRemove.includes(key));
    return copyObjectWithOnlyKeys(obj, keysToKeep);
}

export async function MakeValidator<T>(validator: Joi.ObjectSchema<T>, obj: T, optional?: Joi.ValidationOptions) {
    const validationError: any = await validator.validate(obj, optional);
    if (validationError.error != null) {

        const _error = ValidationErrorFactory({
            msg: validationError.error?.message,
            statusCode: 400,
            type: "validation",
        }, cleanAttr(validationError.error?.message))
        throw _error;
    } else {
        return validationError.value;
    }
}
export function cleanAttr(errorMsg: string): string {
    var attr: string = errorMsg.split(" ")[0];
    attr = attr.replace('\"', "");
    attr = attr.replace('\"', "");
    return attr;
}