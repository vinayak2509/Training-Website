import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

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

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.getAboutMeData();
    }
  }

  getAboutMeData() {
    this.http.get(environment.backendUrl + '/about', { withCredentials: true }).subscribe({
      next: (data: any) => {
        this.aboutMe = data;
      },
      error: (error) => {
        console.error('Error fetching About Me data:', error);
      },
      complete: () => {
        console.log('Request completed');
      }
    });
    
  }
}
