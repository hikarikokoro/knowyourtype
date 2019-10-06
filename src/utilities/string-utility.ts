import ObjectUtility from './object-utility';

export default class StringUtility {
  public static isNullOrWhiteSpace(s: string | undefined): boolean {
    if (ObjectUtility.isNullOrUndefined(s)) {
      return true;
    }

    if (typeof s !== 'string') {
      return true;
    }

    if (s.trim() === '') {
      return true;
    }

    return false;
  }

  public static replaceAll(
    s: string,
    oldValue: string,
    newValue: string) {
    return s.replace(new RegExp(oldValue, 'g'), newValue);
  }

  public static removeAccents(str: string) {

    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }
}
