import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { DatePipe } from '@angular/common';
import { CommonModule } from '@angular/common';

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
    private userService: UserService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.loadReservations();
  }

  loadReservations() {
    this.userService.getReservations().subscribe(
      (response) => {
        this.reservations = response.data;
      },
      (error) => {
        console.error('Error fetching reservations:', error);
      }
    );
  }

  cancelReservation(id: string) {
    this.userService.cancelReservation(id).subscribe(
      (response) => {
        console.log('Reservation cancelled:', response);
        this.loadReservations();
      },
      (error) => {
        console.error('Error canceling reservation:', error);
      }
    );
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
}