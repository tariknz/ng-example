import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { map, startWith } from 'rxjs/operators';

@Injectable()
export class AuthService {
  private _loggedInStatus = new Subject<boolean>();

  // default sample user
  private _user: User = {
    firstName: 'Ahsan',
    lastName: 'Ayaz'
  };

  constructor() {}

  /**
   * Login user
   *
   * @memberof AuthService
   */
  public login(): void {
    this._loggedInStatus.next(true);
  }

  /**
   * Logs out the current user
   *
   * @memberof AuthService
   */
  public logout(): void {
    this._loggedInStatus.next(false);
  }

  /**
   * Observable for the current logged in user
   *
   * @returns {Observable<User>}
   * @memberof AuthService
   */
  public loggedInUser(): Observable<User> {
    return this._loggedInStatus.pipe(
      startWith(false), // initial value is false (logged out)
      map((loggedIn) => {
        if (loggedIn) {
          return this._user;
        }

        return undefined;
      })
    );
  }

  /**
   * Observable to return the current logged in state
   *
   * @returns {Observable<boolean>}
   * @memberof AuthService
   */
  public isLoggedIn(): Observable<boolean> {
    return this.loggedInUser().pipe(map((user) => !!user));
  }
}
