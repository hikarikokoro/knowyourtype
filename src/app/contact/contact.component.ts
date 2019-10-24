import {
  Component,
  OnInit
} from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';
import {LeaderboardService} from '../../services/leaderboard.service';
import ObjectUtility from '../../utilities/object-utility';
import {Router} from '@angular/router';
import {LanguageService} from '../../services/language.service';
import {UserService} from '../../services/user.service';

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
  private _userService: UserService = undefined;
  private _router: Router = undefined;

  //#endregion

  //#region constructor

  constructor(private leaderboardService: LeaderboardService,
              private router: Router,
              private language: LanguageService,
              private userService: UserService
              ) {
    if (ObjectUtility.isNullOrUndefined(leaderboardService)) {
      throw new Error('LEADERBOARD CANNOT BE EMPTY OR UNDEINED');
    }
    if (ObjectUtility.isNullOrUndefined(userService)) {
      throw new Error('USER SERVICE CANNOT BE EMPTY OR UNDEINED');
    }
    this._leaderboardService = leaderboardService;
    this._userService = userService;
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

  public get currentLanguage(): string {
    return this.language.getCurrentLanguage;
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
      this.goToQuiz();
    } else {
      console.log('INVALID');
    }
  }

  //#endregion

  //#region private functions

  private goToQuiz(): void {
    this._userService.changeUserName(this._profileForm.value.name);
    this._userService.changeUserType(this._profileForm.value.type);
    this._router.navigate(['/quiz']);
  }

  //#endregion

}
