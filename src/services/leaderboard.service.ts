import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import 'firebase/database';
import {environment} from '../environments/environment.prod';
import {Leaderboard} from '../tools/leaderboard';

@Injectable({
  providedIn: 'root'
})
export class LeaderboardService {
  //#region private members

  private db: firebase.database.Database;

  //#endregion

  //#region Constructors

  constructor() {
    const firebaseConfig = environment.firebase;
    const app = firebase.initializeApp(firebaseConfig);
    this.db = app.database();
  }

  //#endregion

  //#region Private Functions

  public async find(): Promise<Leaderboard[]> {
    const base: firebase.database.Reference = this.db.ref('/leaderboards/');
    const snapshot: firebase.database.DataSnapshot = await base.once('value');
    const leaderboards: Leaderboard[] = snapshot.val();

    return leaderboards;
  }

  public create(leaderboard: Leaderboard): void {
    if (!leaderboard) {
      return;
    }

    firebase.database().ref('/').push(leaderboard);
  }

  public generateId(): string {
    return firebase.database().ref('/').push().key as string;
  }

  //#endregion
}
