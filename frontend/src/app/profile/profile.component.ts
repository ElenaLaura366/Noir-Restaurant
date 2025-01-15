import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [DatePipe, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  contactForm: FormGroup;
  reservations: any[] = [];

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
      alert('You must log in to access this page.');
      this.router.navigate(['/signin']);
      return;
    }
  
    this.userService.getReservations().subscribe({
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