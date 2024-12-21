import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  aboutMe: any = {
    name: '',
    location: '',
    education: '',
    job: '',
    hobbies: '',
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getAboutMeData();
  }

  getAboutMeData() {
    this.http.get(`${environment.backendUrl}/about`).subscribe({
      next: (data) => (this.aboutMe = data),
      error: (error) => {
        console.error('Failed to fetch About Me data. Server Response:', error);
        alert('Unable to load About Me data. Please try again later.');
      },
    });
  }
}
