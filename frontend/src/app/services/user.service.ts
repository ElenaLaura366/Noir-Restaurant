import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Reservation } from '../models/reservation.model';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:5000/api';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isLoggedIn());

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    return this.http.post<User>(`${this.baseURL}/users/register`, user);
  }

  login(user: Pick<User, 'email' | 'password'>): Observable<{ token: string; user: User }> {
    return this.http.post<{ token: string; user: User }>(`${this.baseURL}/users/login`, user);
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
    return !!this.getToken();
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.removeItem('sessionToken');
      this.isAuthenticatedSubject.next(false);
    }
  } 

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(`${this.baseURL}/reservations`);
  }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseURL}/reservations`, reservation);
  }

  cancelReservation(reservationId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/reservations/${reservationId}`);
  }
}