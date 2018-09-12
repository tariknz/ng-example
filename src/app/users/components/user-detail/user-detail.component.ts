import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { ActivatedRoute } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { User } from '../../models/user.model';

@Component({
  selector: 'ng-e-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit, OnDestroy {

  public currentUser$: Observable<User>;
  private readonly _destroyed = new Subject<void>();

  constructor(
    private usersService: UsersService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    // retrieves id from route parameters and unsubscribes when the component is destroyed
    this.route.params.pipe(
      filter(param => param['id']), // filters on the id param
      map(param => param['id']), // gets the id param
      takeUntil(this._destroyed)
    ).subscribe(id => this.currentUser$ = this.usersService.get(id));
  }

  ngOnDestroy() {
    // emits event to notify destroy life-cycle hook was run
    this._destroyed.next();
    this._destroyed.complete();
  }
}
