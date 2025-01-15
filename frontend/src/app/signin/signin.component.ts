import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { FormsModule } from '@angular/forms'; 
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-signin',
  imports: [FormsModule],
  templateUrl: './signin.component.html',
  styleUrl: './signin.component.css'
})

export class SigninComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService
  ) {}

  onLogin(): void {
    const userData = { email: this.email, password: this.password };
    this.userService.login(userData).subscribe({
      next: (res) => {
        console.log('Login Successful:', res);
  
        this.userService.saveToken(res.token, this.rememberMe);
  
        this.router.navigate(['/home']);
      },
      error: (err) => console.error('Login Error:', err)
    });
  }

  onRegister(): void {
    this.router.navigate(['/register']);
  }
}