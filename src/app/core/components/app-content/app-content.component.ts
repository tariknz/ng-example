import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ng-e-app-content',
  templateUrl: './app-content.component.html',
  styleUrls: ['./app-content.component.scss']
})
export class AppContentComponent implements OnInit, OnDestroy {
  public user$: Observable<User>;
  public isLoggedIn$: Observable<boolean>;

  private readonly _destroyed = new Subject<void>();

  constructor(private authService: AuthService) { }

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

  ngOnDestroy() {
    // emits event to notify destroy life-cycle hook was run
    this._destroyed.next();
    this._destroyed.complete();
  }
}
