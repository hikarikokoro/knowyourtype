import { Component, OnInit } from '@angular/core';
import ObjectUtility from '../../utilities/object-utility';
import {Router} from '@angular/router';
import {LeaderboardService} from '../../services/leaderboard.service';
import {Leaderboard} from '../../tools/leaderboard';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-bonusquestion',
  templateUrl: './bonusquestion.component.html',
  styleUrls: ['./bonusquestion.component.scss']
})
export class BonusquestionComponent implements OnInit {

  //#region private members

  private _leaderboardService: LeaderboardService = undefined;
  private _router: Router = undefined;
  private _answered = false;
  private _answer = false;
  private _user: Leaderboard = undefined;

  //#endregion

  //#region constructor

  constructor(
    private leaderboardService: LeaderboardService,
    private router: Router,
    private language: LanguageService
  ) {
    if (ObjectUtility.isNullOrUndefined(leaderboardService)) {
      throw new Error('LEADERBOARD CANNOT BE EMPTY OR UNDEINED');
    }
    this._leaderboardService = leaderboardService;
    this._router = router;
  }


  //#endregion


  //#region properties

  public get currentLanguage(): string {
    return this.language.getCurrentLanguage;
  }

  public get answered(): boolean {
    return this._answered;
  }

  public get answer(): boolean {
    return this._answer;
  }

  //#endregion


  //#region Implementated functions


  async ngOnInit() {
    this._user = await this._leaderboardService.findCurrentUser();
  }

  //#endregion

  //#region public functions

  public async checkAnswer(selected: boolean): Promise<void> {
    this._answered = true;
    if (selected) {
      this._answer = true;
      await this.addToTop();
    }
  }

  public async addToTop(): Promise<void>  {
    const newLeaderboard = new Leaderboard(
      this._user.name,
      this._user.type,
      this._user.id,
      true,
    );
    await this._leaderboardService.update(newLeaderboard);
  }

  //#endregion

}
