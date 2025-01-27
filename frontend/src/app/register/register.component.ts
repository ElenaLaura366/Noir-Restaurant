import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})

export class RegisterComponent {
  user: User = { name: '', email: '', password: '' };

  constructor(private userService: UserService, private router: Router) {}

  onRegister(): void {
    this.userService.register(this.user).subscribe({
      next: (user: User) => {
        console.log('Registration Successful:', user);
        this.router.navigate(['/signin']);
      },
      error: (err) => console.error('Registration Error:', err),
    });
  }  
}
