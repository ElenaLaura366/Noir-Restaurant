import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onRegister(): void {
    const userData = { name: this.name, email: this.email, password: this.password };
    this.userService.register(userData).subscribe({
      next: (res) => {
        console.log('Registration Successful:', res);
        this.router.navigate(['/signin']);
      },
      error: (err) => console.error('Registration Error:', err)
    });
  }
}
