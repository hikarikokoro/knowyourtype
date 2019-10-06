import {Component, OnInit} from '@angular/core';
import ObjectUtility from '../../utilities/object-utility';
import {Router} from '@angular/router';
import {Leaderboard} from '../../tools/leaderboard';
import {LeaderboardService} from '../../services/leaderboard.service';

@Component({
  selector: 'app-final',
  templateUrl: './final.component.html',
  styleUrls: ['./final.component.scss']
})
export class FinalComponent implements OnInit {

  //#region private members

  private _interval: any = undefined;
  private _leaderboardService: LeaderboardService = undefined;
  private _router: Router = undefined;

  //#endregion

  //#region constructor

  constructor(leaderboardService: LeaderboardService, router: Router) {
    if (ObjectUtility.isNullOrUndefined(leaderboardService)) {
      throw new Error('LEADERBOARD CANNOT BE EMPTY OR UNDEINED');
    }
    this._leaderboardService = leaderboardService;
    this._router = router;
  }


  //#endregion


  //#region Implementated functions


  ngOnInit() {
    this.registerUser();
    this.startTimer(10);
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

  private pauseTimer() {
    clearInterval(this._interval);
  }

  //#endregion
}
