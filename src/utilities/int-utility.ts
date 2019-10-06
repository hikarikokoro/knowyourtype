import ObjectUtility from './object-utility';

export default class IntUtility {
  public static isUint(n: any): boolean {
    if (ObjectUtility.isNullOrUndefined(n)) {
      return true;
    }

    if (typeof n === 'number' && n >= 0) {
      return true;
    }

    return false;
  }

}
