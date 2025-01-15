import { Component } from '@angular/core';
import { FooterComponent } from '../footer/footer.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-reserve',
  imports: [ReactiveFormsModule, CommonModule, FooterComponent],
  templateUrl: './reserve.component.html',
  styleUrl: './reserve.component.css'
})

export class ReserveComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      date: ['', Validators.required],
      time: ['', Validators.required],
      people: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;
      this.userService.createReservation(formData).subscribe({
        next: (response) => {
          alert('Rezervare trimisă cu succes!');
          this.contactForm.reset();
        },
        error: (err) => {
          console.error('Error creating reservation:', err);
          alert('A apărut o problemă la trimiterea rezervării.');
        }
      });
    } else {
      console.log('Formular invalid');
    }
  }   
}