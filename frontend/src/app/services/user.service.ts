import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:5000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users/register`, userData);
  }

  login(userData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/users/login`, userData);
  }

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('sessionToken', token);
      this.isAuthenticatedSubject.next(true);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return sessionStorage.getItem('sessionToken');
    }
    return null;
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      return !!sessionStorage.getItem('sessionToken');
    }
    return false;
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('sessionToken');
      this.isAuthenticatedSubject.next(false);
    }
  }

  getReservations(): Observable<any> {
    return this.http.get(`${this.baseURL}/reservations`);
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(`${this.baseURL}/reservations`, reservationData);
  }

  cancelReservation(reservationId: string): Observable<any> {
    return this.http.delete(`${this.baseURL}/reservations/${reservationId}`);
  }
}