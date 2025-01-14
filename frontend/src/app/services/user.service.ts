import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseURL = 'http://localhost:5000/api';

  constructor(private http: HttpClient, private cookieService: CookieService) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users/login`, userData);
  }

  getUsers(token: string): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseURL}/users`, { headers });
  }

  saveToken(token: string, rememberMe: boolean): void {
    const expirationDays = rememberMe ? 7 : undefined;
    this.cookieService.set('sessionToken', token, expirationDays, '/');
  }

  getToken(): string | null {
    return this.cookieService.get('sessionToken');
  }

  isLoggedIn(): boolean {
    return this.cookieService.check('sessionToken');
  }

  logout(): void {
    this.cookieService.delete('sessionToken', '/');
  }

  // Reservation Methods

  getReservations(): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get(`${this.baseURL}/reservations`, { headers });
  }

  cancelReservation(reservationId: string): Observable<any> {
    const token = this.getToken();
    if (!token) {
      throw new Error('No token found!');
    }
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete(`${this.baseURL}/reservations/${reservationId}`, { headers });
  }
}