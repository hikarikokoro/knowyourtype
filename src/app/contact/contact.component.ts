import {
  Component,
  OnInit
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LeaderboardService} from '../../services/leaderboard.service';
import ObjectUtility from '../../utilities/object-utility';
import {Leaderboard} from '../../tools/leaderboard';
import {Router} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  //#region private members

  private _profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    type: new FormControl('', [Validators.required, Validators.minLength(4)]),
  });
  private _submitted: boolean = false;
  private _desabledButton: boolean = false;
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

  //#region Properties

  public get profileForm(): FormGroup {
    return this._profileForm;
  }

  public get submitted(): boolean {
    return this._submitted;
  }

  public get desabledButton(): boolean {
    return this._desabledButton;
  }

  //#endregion

  //#region Implementated functions

  ngOnInit() {
  }

  //#endregion

  //#region public functions

  public onSubmit(): void {

    console.log(this._profileForm);

    // TODO: Use EventEmitter with form value
    this._submitted = true;
    if (this._profileForm.valid) {
      this._desabledButton = true;
      this.registerUser();
    } else {
      console.log('INVALID');
    }
  }

  //#endregion

  //#region private functions

  private goToQuiz(): void {
    this._router.navigate(['/quiz']);
  }

  private async registerUser(): Promise<void> {
    console.log(this._profileForm);
    const leaderboardEntry: Leaderboard = new Leaderboard(this._profileForm.value.name, this._profileForm.value.type);
    await this._leaderboardService.create(leaderboardEntry);
    this.goToQuiz();
  }

  //#endregion

}
