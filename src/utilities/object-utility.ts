import NumericUtility from './numeric-utility';
import StringUtility from './string-utility';

export default class ObjectUtility {
  public static isNullOrUndefined(value: any): boolean {
    if (value === null || value === undefined) {
      return true;
    }

    return false;
  }

  public static isNullOrEmpty(value: any): boolean {
    if (ObjectUtility.isNullOrUndefined(value)) {
      return true;
    }

    if (typeof value === 'string') {
      return StringUtility.isNullOrWhiteSpace(value);
    }

    if (typeof value === 'number' ||
      typeof value === 'boolean' ||
      typeof value === 'symbol' ||
      typeof value === 'undefined' ||
      typeof value === 'function') {
      return false;
    }

    if (value instanceof Date) {
      return false;
    }

    if (Object.keys(value).length === 0) {
      const prototype: any = Object.getPrototypeOf(value);

      return Object.keys(prototype).length === 0;
    }

    return false;
  }

  public static pruneProperties<T>(obj: T, removeFalsyValues: boolean = false): T {
    if (ObjectUtility.isNullOrUndefined(obj)) {
      throw new Error('OBJ Cannot be empty of undefined.');
    }

    for (const property of Object.keys(obj)) {
      const value = (obj as any)[property];

      // On enleve les valeurs falsy (null, undefined, '', mais pas 0);
      if (ObjectUtility.isNullOrEmpty(value) || (removeFalsyValues && NumericUtility.isNotNumeric(value) && !value)) {
        (obj as any)[property] = undefined;
        delete (obj as any)[property];
      }
    }

    return obj;
  }
}
