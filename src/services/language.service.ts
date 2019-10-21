import {Injectable} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  //#region private members

  private _currentLanguage = 'fr';

  //#endregion

  //#region Constructors

  constructor(private translate: TranslateService) {
    translate.setDefaultLang('fr');
  }

  //#endregion

  //#region public Functions

  public get getCurrentLanguage(): string {
    return this._currentLanguage;
  }

  public setCurrentLanguage(newLang: string) {
    this._currentLanguage = newLang;
    this.translate.use(newLang);
  }

  //#endregion
}
