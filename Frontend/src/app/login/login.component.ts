import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'; // HttpClient to make HTTP requests
import { environment } from '../../environments/environment';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  enteredEmail = '';
  enteredPassword = '';
  errorMessage = '';
  isLoggedIn = false;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit(): void {}

  onSubmit(): void {
    const userCredentials = {
      email: this.enteredEmail,
      password: this.enteredPassword,
    };

    this.http
      .post<any>(`${environment.backendUrl}/login`, userCredentials)
      .subscribe({
        next: (response) => {
          try {
            const userData = {
              email: this.enteredEmail,
              role: response.role,
            };
            sessionStorage.setItem('user', JSON.stringify(userData));
            sessionStorage.setItem('isLoggedIn', 'true');
          } catch (e) {
            console.error('Failed to save to session storage', e);
            this.errorMessage =
              'An error occurred while storing session data. Please try again.';
            return;
          }

          if (response.role === 'admin') {
            window.location.href = '/userAdmin';
          } else {
            window.location.href = '/user';
          }
        },
        error: (error) => {
          this.errorMessage =
            error.error.message || 'An error occurred. Please try again.';
        },
      });
  }

  signUp(): void {
    this.router.navigate(['/signUp']);
  }
}
