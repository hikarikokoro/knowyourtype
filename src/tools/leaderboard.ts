import {ILeaderboard} from './leaderboard.interface';
import StringUtility from '../utilities/string-utility';

export class Leaderboard implements ILeaderboard {
  private _id: string;
  private _name: string;
  private _type: string;
  private _top = false;

  constructor(name: string, type: string, id?: string, top?: boolean) {
    this._name = name;
    this._type = type;

    if (!StringUtility.isNullOrWhiteSpace(id)) {
      this._id = id;
    }
    if (top) {
      this._top = top;
    }
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._name;
  }

  public get type(): string {
    return this._type;
  }

  public get top(): boolean {
    return this._top;
  }

  public fromJSON(leaderboard: ILeaderboard): Leaderboard {
    if (!leaderboard) {
      return;
    }
    const newLeaderboard: Leaderboard = new Leaderboard(
      leaderboard.name,
      leaderboard.type,
      leaderboard.id,
      leaderboard.top,
    );

    return newLeaderboard;
  }

  public toJSON(leaderboard: Leaderboard): ILeaderboard {
    if (!leaderboard) {
      return;
    }
    const json: ILeaderboard = {
      name: leaderboard.name,
      type: leaderboard.type,
      id: leaderboard.id,
      top: leaderboard.top
    };

    return json;
  }

}
