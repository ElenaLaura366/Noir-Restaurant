import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Reservation, ReservationResponse } from '../models/reservation.model';
import { User } from '../models/user.model';
import { jwtDecode } from 'jwt-decode';

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
    return this.http.post<{ token: string; user: User }>(`${this.baseURL}/users/login`, user).pipe(
      tap((response: { token: string; user: User }) => {
        sessionStorage.setItem('sessionToken', response.token);
      })
    );
  }   

  saveToken(token: string): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      sessionStorage.setItem('sessionToken', token);
      this.isAuthenticatedSubject.next(true);
    }
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token = sessionStorage.getItem('sessionToken');
      if (token && token.split('.').length === 3) {
        return token;
      }
      console.error('Invalid token format');
      return null;
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

  getUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken: any = jwtDecode(token);
      return decodedToken.email || null;
    }
    return null;
  }

  getReservations(email?: string): Observable<ReservationResponse> {
    const token = sessionStorage.getItem('sessionToken');
  
    return this.http.get<ReservationResponse>(`${this.baseURL}/reservations?email=${email}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
  }
   
  
  getLoggedInUserEmail(): string | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = JSON.parse(atob(token.split('.')[1]));
      return decodedToken.email;
    }
    return null;
  }  

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.http.post<Reservation>(`${this.baseURL}/reservations`, reservation);
  }

  cancelReservation(reservationId: string): Observable<void> {
    return this.http.delete<void>(`${this.baseURL}/reservations/${reservationId}`);
  }
}