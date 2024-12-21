import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  imports: [RouterLink, RouterLinkActive],
})
export class NavbarComponent implements OnInit {
  navbarItems = [
    { label: 'Home', link: '/home' },
    { label: 'About Me', link: '/about' },
    { label: 'Projects', link: '/projects' },
    { label: 'Get In Touch', link: '/contact' },
  ];

  imageLinks = [
    {
      name: 'LinkedIn-Logo.png',
      link: 'https://www.linkedin.com/in/vinayak-sharma-611023196/',
    },
    { name: 'github-logo.webp', link: 'https://github.com/vinayak2509' },
  ];

  mode: boolean = false;
  isLoggedIn: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    try {
      const savedMode = sessionStorage.getItem('mode');
      this.mode = savedMode === 'true';
      this.applyMode(this.mode);

      const storedLoginStatus = sessionStorage.getItem('isLoggedIn');
      this.isLoggedIn = storedLoginStatus === 'true';
    } catch (error) {
      console.error('Error accessing session storage:', error);
    }
  }

  onModeChange(): void {
    this.mode = !this.mode;
    try {
      sessionStorage.setItem('mode', this.mode.toString());
    } catch (error) {
      console.error('Error saving mode to session storage:', error);
    }
    this.applyMode(this.mode);
  }

  onLogout(): void {
    try {
      sessionStorage.removeItem('isLoggedIn');
      sessionStorage.removeItem('user');
    } catch (error) {
      console.error('Error removing session data:', error);
    }
    this.isLoggedIn = false;

    window.location.href = '/login';
    alert('You have been logged out');
  }

  onUserProfile(): void {
    try {
      const loggedInUser = sessionStorage.getItem('user');
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        if (userData.role === 'admin') {
          window.location.href = '/userAdmin';
        } else {
          window.location.href = '/user';
        }
      } else {
        window.location.href = '/login';
        alert('You must be logged in to see your user profile');
      }
    } catch (error) {
      console.error('Error accessing user data from session storage:', error);
      alert('An error occurred. Please try again.');
    }
  }

  onNotifications(): void {
    try {
      const loggedInUser = sessionStorage.getItem('user');
      if (loggedInUser) {
        const userData = JSON.parse(loggedInUser);
        if (userData.role === 'admin') {
          window.location.href = '/notifications';
        } else {
          alert('Only admins can access notifications');
        }
      } else {
        alert(
          'You need to be logged in and be an admin to access notifications'
        );
      }
    } catch (error) {
      console.error('Error accessing user data for notifications:', error);
      alert('An error occurred. Please try again.');
    }
  }

  private applyMode(mode: boolean): void {
    if (mode) {
      document.body.style.backgroundColor = 'white';
      document.body.style.color = 'black';
    } else {
      document.body.style.backgroundColor = 'black';
      document.body.style.color = 'white';
    }
  }
}
