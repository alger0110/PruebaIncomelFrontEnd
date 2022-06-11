import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(String(localStorage.getItem('currentUser')))
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValueObservable(): Observable<User> {
    return this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public setCurrentUserValue(model: User) {
    localStorage.setItem('currentUser', JSON.stringify(model));
    this.currentUserSubject.next(model);
  }
}
