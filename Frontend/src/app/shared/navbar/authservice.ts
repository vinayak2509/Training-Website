import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

  constructor() {
    const storedLoginStatus = sessionStorage.getItem('isLoggedIn');
    this.loggedInSubject.next(storedLoginStatus === 'true');
  }

  login(): void {
    sessionStorage.setItem('isLoggedIn', 'true');
    this.loggedInSubject.next(true);
  }

  logout(): void {
    sessionStorage.removeItem('isLoggedIn');
    this.loggedInSubject.next(false);
  }

  get isLoggedIn(): boolean {
    return this.loggedInSubject.getValue();
  }
}
