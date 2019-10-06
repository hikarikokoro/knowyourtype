import {Component, OnInit} from '@angular/core';
import ObjectUtility from '../../utilities/object-utility';
import {Router} from '@angular/router';
import {LeaderboardService} from '../../services/leaderboard.service';
import {QuizService} from '../../services/quiz.service';
import {Quiz} from '../../tools/quiz';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss']
})
export class QuizComponent implements OnInit {
//#region private members

  private _chosen: number = 0;
  private _question: Quiz = undefined;
  private _leaderboardService: LeaderboardService = undefined;
  private _quizService: QuizService = undefined;
  private _router: Router = undefined;
  private _retro = false;
  private _answered = false;
  private _seeScore = false;
  private _score: number = 0;

  //#endregion

  //#region constructor

  constructor(
    leaderboardService: LeaderboardService,
    router: Router,
    quizService: QuizService
  ) {
    if (ObjectUtility.isNullOrUndefined(leaderboardService)) {
      throw new Error('LEADERBOARD CANNOT BE EMPTY OR UNDEINED');
    }
    if (ObjectUtility.isNullOrUndefined(quizService)) {
      throw new Error('QUIZ CANNOT BE EMPTY OR UNDEINED');
    }
    this._leaderboardService = leaderboardService;
    this._quizService = quizService;
    this._router = router;
  }


  //#endregion


  //#region properties

  public get question(): Quiz {
    return this._question;
  }

  public get answered(): boolean {
    return this._answered;
  }

  public get retro(): boolean {
    return this._retro;
  }

  public get score(): number {
    return this._score;
  }

  public get seeScore(): boolean {
    return this._seeScore;
  }

  //#endregion


  //#region Implementated functions


  ngOnInit() {
    this.next();
  }

  //#endregion

  //#region public functions

  public checkAnswer(selected: boolean): void {
    this._retro = false;
    this._answered = true;
    if (selected === this._question.answer) {
      this._retro = true;
      this._score += 1;
    }
  }

  public next(): void {
    this._chosen += 1;
    if (this._chosen !== 7) {
      this.nextQuestion();
    } else {
      this._seeScore = true;
    }
  }

  public goBackToStart(): void {
    this._router.navigate(['/']);
  }

  //#endregion

  //#region private functions

  private nextQuestion(): void {
    this._question = this._quizService.getById(this._chosen);
    this._answered = false;
  }

  //#endregion
}
