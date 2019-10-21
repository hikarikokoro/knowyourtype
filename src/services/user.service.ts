import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UserService {

  private userIdSource = new BehaviorSubject('-LqsXf4RP6ptytxFA_6T');

  userId = this.userIdSource.asObservable();

  constructor() { }

  changeUserId(userId: string) {
    this.userIdSource.next(userId);
  }
  getUserId() {
    return this.userId;
  }
}
