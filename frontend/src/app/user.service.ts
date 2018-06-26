import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import { UserProfile } from './user-profile';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, ) { }

  getRoles(): Observable<UserProfile[]> {
    const url = `${this.baseUrl}/roles`;
    return this.http.get<UserProfile[]>(url)
      .pipe(
        tap(roles => this.log(`fetched roles`)),
        catchError(this.handleError('getRoles', []))
      );
  }

  getUsersList(): Observable<User[]> {
    const url = `${this.baseUrl}/list`;
    return this.http.get<User[]>(url)
      .pipe(
        tap(users => this.log(`fetched users`)),
        catchError(this.handleError('getUsersList', []))
      );
  }

  getUser(ssoId: string): Observable<User> {
    const url = `${this.baseUrl}/get-user/${ssoId}`;
    return this.http.get<User>(url)
      .pipe(
        tap(users => this.log(`fetched user`)),
        catchError(this.handleError<User>(`getUser ssoId=${ssoId}`))
      );
  }

  addUser(user: User): Observable<any> {
    const url = `${this.baseUrl}/add-user`;
    return this.http.post<any>(url, user, httpOptions).pipe(
      tap(_ => this.log(`added user w/ id=${user.ssoId}`)),
      catchError(this.handleError<any>('adduser'))
    );
  }

  editUser(user: User): Observable<any> {
    const url = `${this.baseUrl}/edit-user`;
    return this.http.put<any>(url, user, httpOptions).pipe(
      tap(_ => this.log(`edit user w/ id=${user.ssoId}`)),
      catchError(this.handleError<any>('editUser'))
    );
  }

  deleteUser(ssoId: string): Observable<User[]> {
    const url = `${this.baseUrl}/delete-user/${ssoId}`;
    return this.http.delete<User[]>(url, httpOptions).pipe(
      tap(_ => this.log(`delete user w/ id=${ssoId}`)),
      catchError(this.handleError<User[]>('deleteUser', []))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a userService message with the MessageService */
  private log(message: string) {
    console.log(message);
  }
}
