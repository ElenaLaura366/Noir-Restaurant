import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Reservation } from '../models/reservation.model';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  contactForm: FormGroup;
  reservations: Reservation[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/signin']);
      return;
    }
  
    const userEmail = this.userService.getUserEmail();
  
    if (!userEmail) {
      console.error('No email found in token. Redirecting to signin.');
      this.router.navigate(['/signin']);
      return;
    }
  
    this.userService.getReservations(userEmail).subscribe({
      next: (response) => {
        this.reservations = response.data;
      },
      error: (err) => {
        console.error('Error fetching reservations', err);
        if (err.status === 401) {
          alert('Session expired. Please log in again.');
          this.logout();
        }
      },
    });
  }    

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formular trimis:', this.contactForm.value);
      alert('Mesaj trimis cu succes!');
      this.contactForm.reset();
    } else {
      console.log('Formular invalid');
    }
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}