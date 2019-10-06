import {Component, OnInit} from '@angular/core';
import {LeaderboardService} from '../../services/leaderboard.service';
import {Leaderboard} from '../../tools/leaderboard';
import {LeaderboardViewModel} from './leaderboard.view.model';
import ObjectUtility from '../../utilities/object-utility';
import TimeUtility from '../../utilities/time-utility';
import * as _ from 'lodash';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  //#region private members

  private _firebaseService: LeaderboardService = undefined;
  private _leaderboards: LeaderboardViewModel[] = undefined;

  //#endregion

  //#region constructor

  constructor(leaderboardService: LeaderboardService) {
    this._firebaseService = leaderboardService;
  }

  //#endregion

  //#region Properties

  public get leaderboards(): LeaderboardViewModel[] {
    return this._leaderboards;
  }

  //#endregion

  //#region Implementated functions

  ngOnInit() {
    this.refreshLeaderboard();
  }

  //#endregion

  //#region private functions
  private resetLeaderboard(): void {
    this._leaderboards = [];
  }

  private async refreshLeaderboard(): Promise<void> {
    this.resetLeaderboard();
    const leaderboards: Leaderboard[] = await this._firebaseService.find();

    if (!ObjectUtility.isNullOrEmpty(leaderboards)) {
      _.forEach(leaderboards, (item) => {
        const newLeaderboard: LeaderboardViewModel = new LeaderboardViewModel(item.name, item.type);
        this._leaderboards.push(newLeaderboard);
      });
    }
  }

  //#endregion

}
