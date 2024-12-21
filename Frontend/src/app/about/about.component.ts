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
    this.http.get(environment.backendUrl + '/about').subscribe(
      (data: any) => {
        this.aboutMe = data;
      },
      (error) => {
        console.error('Error fetching About Me data:', error);
      }
    );
  }
}
