import {IQuiz} from './quiz.interface';

export class Quiz implements IQuiz {
  private _id: number;
  private _question: string;
  private _explanation: string;
  private _answer: boolean;

  constructor(id: number, question: string, explanation: string, answer: boolean) {
    if (!id) {
      return;
    }
    this._id = id;
    this._question = question;
    this._explanation = explanation;
    this._answer = answer;
  }

  public get id(): number {
    return this._id;
  }

  public get question(): string {
    return this._question;
  }

  public get explanation(): string {
    return this._explanation;
  }

  public get answer(): boolean {
    return this._answer;
  }

  public static fromJSON(doctor: IQuiz): Quiz {
    if (!doctor) {
      return;
    }
    const newQuestion: Quiz = new Quiz(
      doctor.id,
      doctor.question,
      doctor.explanation,
      doctor.answer
    );

    return newQuestion;
  }

  public toJSON(leaderboard: Quiz): IQuiz {
    if (!leaderboard) {
      return;
    }
    const json: IQuiz = {
      id: leaderboard.id,
      question: leaderboard.question,
      explanation: leaderboard.explanation,
      answer: leaderboard.answer
    };

    return json;
  }

}
