import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../services/users.service';
import { Observable } from 'rxjs/Observable';
import { User } from '../../models/user.model';

@Component({
  selector: 'ng-e-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent {

  public users$: Observable<User[]>;

  constructor(usersService: UsersService) {
    this.users$ = usersService.list();
  }

}
