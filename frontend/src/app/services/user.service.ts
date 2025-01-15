import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:5000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users/login`, userData);
  }

  saveToken(token: string, rememberMe: boolean): void {
    const expirationDays = rememberMe ? 7 : undefined;
    this.cookieService.set('sessionToken', token, expirationDays, '/');
    this.isAuthenticatedSubject.next(true);
  }

  getToken(): string | null {
    return this.cookieService.get('sessionToken');
  }

  isLoggedIn(): boolean {
    return this.cookieService && this.cookieService.check('sessionToken');
  }  

  logout(): void {
    this.cookieService.delete('sessionToken', '/');
    this.isAuthenticatedSubject.next(false);
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.baseURL}/reservations`);
  }
}

