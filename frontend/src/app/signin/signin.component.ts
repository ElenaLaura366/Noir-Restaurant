import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user.model';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
  user: Pick<User, 'email' | 'password'> = { email: '', password: '' };
  rememberMe: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onLogin(): void {
    this.userService.login(this.user).subscribe({
      next: (res) => {
        console.log('Login Successful:', res);
        this.userService.saveToken(res.token);
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Login Error:', err),
    });
  } 

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}