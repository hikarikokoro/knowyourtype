import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class UserService {

  private userIdSource = new BehaviorSubject('-LqsXf4RP6ptytxFA_6T');
  userId = this.userIdSource.asObservable();
  private userName: string = undefined;
  private userType: string = undefined;

  constructor() {
  }

  changeUserId(userId: string) {
    this.userIdSource.next(userId);
  }

  getUserId() {
    return this.userId;
  }

  changeUserName(userName: string) {
    this.userName = userName;
  }

  getUserName() {
    return this.userName;
  }

  changeUserType(userType: string) {
    this.userType = userType;
  }

  getUserType() {
    return this.userType;
  }
}
