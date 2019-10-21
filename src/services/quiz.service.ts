import {Injectable} from '@angular/core';
import {Quiz} from '../tools/quiz';
import * as quiz from '../tools/quiz.json';


@Injectable({
  providedIn: 'root'
})
export class QuizService {

  //#region Constructors

  constructor() {
  }

  //#endregion

  //#region Private Functions

  public getById(id: number): Quiz {
    return Quiz.fromJSON(quiz.questions[id - 1]);
  }

  //#endregion
}
