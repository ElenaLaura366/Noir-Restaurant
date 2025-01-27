import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FooterComponent } from '../footer/footer.component';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { Reservation } from '../models/reservation.model';

@Component({
  selector: 'app-reserve',
  imports: [CommonModule, FooterComponent, FormsModule],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css',
})
export class ReserveComponent {
  reservation: Reservation = {
    name: '',
    email: '',
    date: '',
    time: '',
    people: 1,
    message: '',
  };

  dateError: string | null = null;

  constructor(private userService: UserService) {}

  onSubmit(): void {
    this.validateDate();
    if (!this.dateError && this.isReservationValid()) {
      this.userService.createReservation(this.reservation).subscribe({
        next: () => {
          alert('Reservation submitted successfully!');
          this.resetReservation();
        },
        error: (err) => {
          console.error('Error creating reservation:', err);
          alert('An error occurred while submitting the reservation.');
        },
      });
    }
  }

  private validateDate(): void {
    const selectedDate = new Date(this.reservation.date);
    const currentDate = new Date();

    if (selectedDate.toString() === 'Invalid Date') {
      this.dateError = 'The date is invalid.';
    } else if (selectedDate < currentDate) {
      this.dateError = 'The date must be in the future.';
    } else {
      this.dateError = null;
    }
  }

  private isReservationValid(): boolean {
    if (!this.reservation.name || !this.reservation.email || !this.reservation.date || !this.reservation.time || this.reservation.people < 1 || !this.reservation.message) {
      alert('Please fill in all required fields.');
      return false;
    }
    return true;
  }

  private resetReservation(): void {
    this.reservation = {
      name: '',
      email: '',
      date: '',
      time: '',
      people: 1,
      message: '',
    };
    this.dateError = null;
  }
}