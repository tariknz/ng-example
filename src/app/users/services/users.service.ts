import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';
import { UsersApiResponse, UserApiResponseResult } from '../models/users-api-response.model';

@Injectable()
export class UsersService {
  private _baseUrl = 'https://randomuser.me/api/';
  private _seed = ''; // used to keep the data consistent
  private _limit = 20;

  constructor(private http: HttpClient) {}

  /**
   * Lists users from RandomUser API with a predefined limit (defaults to 20 users)
   *
   * @returns {Observable<User[]>}
   * @memberof UsersService
   */
  public list(): Observable<User[]> {
    return this.http.get<UsersApiResponse>(`${this._baseUrl}?results=${this._limit}&seed=${this._seed}`).pipe(
      map((response) => {
        this._seed = response.info.seed;
        return response.results.map(this._mapResponse);
      })
    );
  }

  /**
   * Gets user by id using the existing list view from a previous seed
   *
   * @param {string} id
   * @returns {Observable<User>}
   * @memberof UsersService
   */
  public get(id: string): Observable<User> {
    return this.http.get<UsersApiResponse>(`${this._baseUrl}?results=${this._limit}&seed=${this._seed}`).pipe(
      map((response) => {
        const match = response.results.find((user) => user.login.uuid === id);

        if (!match) {
          return undefined;
        }

        return this._mapResponse(match);
      })
    );
  }

  private _mapResponse(user: UserApiResponseResult): User {
    return {
      firstName: user.name.first,
      lastName: user.name.last,
      email: user.email,
      imageUrl: user.picture.large,
      phone: user.phone,
      id: user.login.uuid
    };
  }
}
