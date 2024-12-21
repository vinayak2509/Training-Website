import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SignUpService } from './sign-up.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  standalone: true,
  imports: [FormsModule],
})
export class SignUpComponent {
  enteredEmail = '';
  enteredPassword = '';
  enteredConfirmedPassword = '';
  errorMessage = '';

  constructor(private signUpService: SignUpService, private router: Router) {}

  onSubmit() {
    console.log('Form Submitted!');

    if (this.enteredPassword !== this.enteredConfirmedPassword) {
      this.errorMessage = "Passwords don't match.";
      return;
    }

    const userCredentials = {
      email: this.enteredEmail,
      password: this.enteredPassword,
    };

    console.log('User Data:', userCredentials);

    this.signUpService.signup(userCredentials).subscribe({
      next: (response) => {
        console.log('Signup response:', response);

        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Signup error:', error);
        this.errorMessage =
          error.error.message || 'An error occurred. Please try again.';
      },
    });
  }
}
