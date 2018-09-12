import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs/Observable';
import { AuthService } from '../../services/auth.service';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ng-e-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: [ './app-header.component.scss' ]
})
export class AppHeaderComponent implements OnInit {
  public user$: Observable<User>;
  public isLoggedIn$: Observable<boolean>;

  private readonly _destroyed = new Subject<void>();

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.user$ = this.authService.loggedInUser().pipe(takeUntil(this._destroyed));
    this.isLoggedIn$ = this.authService.isLoggedIn().pipe(takeUntil(this._destroyed));
  }

  /**
   * @author Ahsan Ayaz
   * @desc Logs the user in
   */
  login() {
    this.authService.login();
  }

  /**
   * @author Ahsan Ayaz
   * @desc Logs the user out
   */
  logout() {
    this.authService.logout();
  }

  /**
   * @author Ahsan Ayaz
   * @desc Logs the user in
   */
  signup() {
    this.logout();
  }

  ngOnDestroy() {
    // emits event to notify destroy life-cycle hook was run
    this._destroyed.next();
    this._destroyed.complete();
  }
}
