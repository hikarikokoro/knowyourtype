import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/database';
import {environment} from '../environments/environment.prod';
import {Leaderboard} from '../tools/leaderboard';
import {ILeaderboard} from '../tools/leaderboard.interface';
import StringUtility from '../utilities/string-utility';
import {BehaviorSubject} from 'rxjs';
import ObjectUtility from '../utilities/object-utility';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  //#region private members

  private db: firebase.database.Database;
  private userIdSource = new BehaviorSubject('-LqsXf4RP6ptytxFA_6T');
  private userId = this.userIdSource.asObservable();

  //#endregion

  //#region Constructors

  constructor() {
    const firebaseConfig = environment.firebase;
    const app = firebase.initializeApp(firebaseConfig);
    this.db = app.database();
  }

  //#endregion

  //#region Private Functions

  public async findCurrentUser(): Promise<Leaderboard> {
    if (ObjectUtility.isNullOrUndefined(this.userIdSource)) {
      throw new Error('LEADERBOARD MUST HAVE ID');
    }
    const userId = this.userIdSource.getValue();
    const base: firebase.database.Reference = this.db.ref('/leaderboard/' + userId);
    const snapshot: firebase.database.DataSnapshot = await base.once('value');
    const leaderboard: Leaderboard = snapshot.val();

    return leaderboard;
  }

  public async find(): Promise<Leaderboard[]> {
    const base: firebase.database.Reference = this.db.ref('/leaderboard/');
    const snapshot: firebase.database.DataSnapshot = await base.once('value');
    const leaderboards: Leaderboard[] = snapshot.val();

    return leaderboards;
  }

  public async findTop(): Promise<Leaderboard[]> {
    const base: firebase.database.Reference = this.db.ref('/leaderboard/');
    const filters = base.orderByChild('top').equalTo(true);
    const snapshot: firebase.database.DataSnapshot = await filters.once('value');
    const leaderboards: Leaderboard[] = snapshot.val();

    return leaderboards;
  }

  public async create(leaderboard: Leaderboard): Promise<void> {
    if (ObjectUtility.isNullOrUndefined(leaderboard)) {
      throw new Error('MUST ENTER A LEADERBOARD ON CREATION');
    }

    const newLeaderboardEntry: ILeaderboard = leaderboard.toJSON(leaderboard);
    if (StringUtility.isNullOrWhiteSpace(newLeaderboardEntry.id)) {
      const newId = await this.generateId();
      newLeaderboardEntry.id = newId;
    }
    const newid = firebase.database().ref('/leaderboard/').push(newLeaderboardEntry);
    this.userIdSource.next(newid.key);
  }

  public async update(leaderboard: Leaderboard): Promise<void> {
    if (!leaderboard) {
      return;
    }
    if (StringUtility.isNullOrWhiteSpace(leaderboard.id)) {
      throw new Error('LEADERBOARD MUST HAVE ID');
    }

    const userId = this.userIdSource.getValue();
    const newLeaderboardEntry: ILeaderboard = leaderboard.toJSON(leaderboard);
    firebase.database().ref('/leaderboard/' + userId).update(newLeaderboardEntry);
  }

  public generateId(): string {
    return firebase.database().ref('/').push().key as string;
  }

  //#endregion
}
