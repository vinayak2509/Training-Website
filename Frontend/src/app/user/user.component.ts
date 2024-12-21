import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent {
  errorMessage: string | null = null;
  enteredNewPassword = '';
  enteredConfirmedNewPassword = '';
  loggedInUser: any = null;
  userEmail: string | null = null;
  storedLoginStatus: string | null = null;
  isLoggedIn: boolean = false;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    try {
      this.loggedInUser = sessionStorage.getItem('user');
      this.userEmail = this.loggedInUser
        ? JSON.parse(this.loggedInUser).email
        : null;

      this.storedLoginStatus = sessionStorage.getItem('isLoggedIn');
      this.isLoggedIn = this.storedLoginStatus === 'true';
    } catch (error) {
      console.error('Error accessing session storage:', error);
    }
  }

  onLogout(): void {
    try {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('user');
      this.isLoggedIn = false;
    } catch (error) {
      console.error('Error removing session data:', error);
    }

    window.location.href = '/login';
    alert('You have been logged out');
  }

  onSubmit() {
    if (this.enteredNewPassword !== this.enteredConfirmedNewPassword) {
      this.errorMessage = 'Passwords do not match!';
      return;
    }

    this.errorMessage = null;

    const payload = {
      email: this.userEmail,
      newPassword: this.enteredNewPassword,
    };

    this.http.put(`${environment.backendUrl}/update`, payload).subscribe(
      (response) => {
        console.log('Password updated successfully:', response);
        alert('Password updated successfully!');
        this.enteredNewPassword = '';
        this.enteredConfirmedNewPassword = '';
        this.onLogout();
      },
      (error) => {
        console.error('Error updating password:', error);
        this.errorMessage =
          error.error?.message || 'Failed to update password.';
      }
    );
  }
}
