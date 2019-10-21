import {Component, OnInit} from '@angular/core';
import {LeaderboardService} from '../../services/leaderboard.service';
import {Leaderboard} from '../../tools/leaderboard';
import {LeaderboardViewModel} from './leaderboard.view.model';
import ObjectUtility from '../../utilities/object-utility';
import * as _ from 'lodash';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {

  //#region private members

  private _firebaseService: LeaderboardService = undefined;
  private _leaderboards: LeaderboardViewModel[] = undefined;
  private _topLeaderboards: LeaderboardViewModel[] = undefined;

  private scrollDistancePerSecond = 50; // Scroll 50px every second.
  private scrollDistancePerAnimationFrame = Math.ceil(this.scrollDistancePerSecond / 60); // Animate at 60 fps.

  //#endregion

  //#region constructor

  constructor(
    private leaderboardService: LeaderboardService,
    private language: LanguageService
  ) {
    this._firebaseService = leaderboardService;
  }

  //#endregion

  //#region Properties

  public get leaderboards(): LeaderboardViewModel[] {
    return this._leaderboards;
  }

  public get currentLanguage(): string {
    return this.language.getCurrentLanguage;
  }

  public get topLeaderboards(): LeaderboardViewModel[] {
    return this._topLeaderboards;
  }

  //#endregion

  //#region Implementated functions

  ngOnInit() {
    this.refreshLeaderboard();
  }

  //#endregion

  //#region public functions
  public useLanguage(language: string) {
    this.language.setCurrentLanguage(language);
  }

  //#endregion

  //#region private functions

  private resetLeaderboard(): void {
    this._leaderboards = [];
    this._topLeaderboards = [];
  }

  private async refreshLeaderboard(): Promise<void> {
    this.resetLeaderboard();

    const leaderboards: Leaderboard[] = await this._firebaseService.find();
    const topLeaderboards: Leaderboard[] = await this._firebaseService.findTop();

    if (!ObjectUtility.isNullOrEmpty(leaderboards)) {
      _.forEach(leaderboards, (item) => {
        const newLeaderboard: LeaderboardViewModel = new LeaderboardViewModel(item.name, item.type);
        this._leaderboards.unshift(newLeaderboard);
      });
    }
    if (!ObjectUtility.isNullOrEmpty(topLeaderboards)) {
      _.forEach(topLeaderboards, (item) => {
        const newLeaderboard: LeaderboardViewModel = new LeaderboardViewModel(item.name, item.type);
        this._topLeaderboards.unshift(newLeaderboard);
      });
    }
  }

  //#endregion

}
