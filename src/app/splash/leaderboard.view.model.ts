export class LeaderboardViewModel {

  //#region private members

  private _name: string;
  private _type: string;

  //#endregion


  //#region constructors

  constructor(name?: string, type?: string) {
    this._name = name as string;
    this._type = type as string;
  }

  //#endregion


  //#region properties

  public get name(): string{
    return this._name;
  }

  public get type(): string{
    return this._type;
  }

  //#endregion

}
