import ObjectUtility from './object-utility';

export default class TimeUtility {
  public static isUint(n: any): boolean {
    if (ObjectUtility.isNullOrUndefined(n)) {
      return true;
    }

    if (typeof n === 'number' && n >= 0) {
      return true;
    }

    return false;
  }


  public static msToTime(s: number) {
    // Pad to 2 or 3 digits, default is 2
    function pad(n, z) {
      z = z || 2;
      return ('00' + n).slice(-z);
    }

    const ms = s % 1000;
    s = (s - ms) / 1000;
    const secs = s % 60;
    s = (s - secs) / 60;
    const mins = s % 60;
    // const hrs = (s - mins) / 60;

    // return pad(hrs) + ':' + pad(mins) + ':' + pad(secs) + '.' + pad(ms, 3);
    return pad(mins, 2) + ':' + pad(secs, 2);
  }

}
