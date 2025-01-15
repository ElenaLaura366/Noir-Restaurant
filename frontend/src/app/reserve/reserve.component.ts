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
      table: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.contactForm.valid) {
      console.log('Formular trimis:', this.contactForm.value);
      alert('Rezervare trimisă cu succes!');
      this.contactForm.reset();
    } else {
      console.log('Formular invalid');
    }
  }
}