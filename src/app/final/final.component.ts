import {Component, OnInit} from '@angular/core';
import ObjectUtility from '../../utilities/object-utility';
import {ActivatedRoute, Router} from '@angular/router';
import {LeaderboardService} from '../../services/leaderboard.service';
import {LanguageService} from '../../services/language.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {

  //#region private members

  private _interval: any = undefined;
  private _answer: string = undefined;
  private _leaderboardService: LeaderboardService = undefined;
  private _router: Router = undefined;
  private _route: ActivatedRoute = undefined;

  //#endregion

  //#region constructor

  constructor(private leaderboardService: LeaderboardService,
              private router: Router,
              private route: ActivatedRoute,
              private language: LanguageService) {
    if (ObjectUtility.isNullOrUndefined(leaderboardService)) {
      throw new Error('LEADERBOARD CANNOT BE EMPTY OR UNDEINED');
    }
    this._leaderboardService = leaderboardService;
    this._router = router;
    this._route = route;
  }


  //#endregion

  public get currentLanguage(): string {
    return this.language.getCurrentLanguage;
  }

  public get answer(): string {
    return this._answer;
  }

  //#region Implementated functions


  ngOnInit() {
    this.registerUser();
    if (this._answer) {
      this.startTimer(10);
    } else {
      this.startTimer(60);
    }

    if (!ObjectUtility.isNullOrEmpty(this.route.snapshot.params.answer)) {
      this._answer = this.route.snapshot.params.answer;
    }
  }

  //#endregion

  //#region private functions

  private goBackToStart(): void {
    this._router.navigate(['/']);
  }

  private async registerUser(): Promise<void> {
    // const leaderboardEntry: Leaderboard = new Leaderboard(this._profileForm.value.name, this._profileForm.value.type);
    // await this._leaderboardService.create(leaderboardEntry);
  }

  private startTimer(timeLeft: number) {
    this._interval = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        console.log('Will redirect in :', timeLeft);
      } else {
        this.pauseTimer();
        this.goBackToStart();
      }
    }, 1000);
  }

  public pauseTimer() {
    clearInterval(this._interval);
  }

  //#endregion
}
