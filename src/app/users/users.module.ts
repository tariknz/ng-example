import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersListComponent } from './components/users-list/users-list.component';
import { UsersService } from './services/users.service';
import { HttpClientModule } from '@angular/common/http';
import { UserDetailComponent } from './components/user-detail/user-detail.component';

@NgModule({
  imports: [
    CommonModule,
    UsersRoutingModule,
    HttpClientModule
  ],
  declarations: [UsersListComponent, UserDetailComponent],
  providers: [UsersService]
})
export class UsersModule { }
