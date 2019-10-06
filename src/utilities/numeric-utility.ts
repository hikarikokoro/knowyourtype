import ObjectUtility from './object-utility';

export default class NumericUtility {
  public static isNotNumeric(n: any): boolean {
    if (ObjectUtility.isNullOrUndefined(n)) {
      return true;
    }

    if (typeof n !== 'number') {
      return true;
    }

    return false;
  }

}
