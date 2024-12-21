import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-user-admin',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css'],
})
export class UserAdminComponent implements OnInit {
  enteredName = '';
  enteredLocation = '';
  enteredEducation = '';
  enteredJob = '';
  enteredHobbies = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserData();
  }

  fetchUserData() {
    this.http.get<any>(`${environment.backendUrl}/about`).subscribe(
      (response) => {
        this.enteredName = response.name;
        this.enteredLocation = response.location;
        this.enteredEducation = response.education;
        this.enteredJob = response.job;
        this.enteredHobbies = response.hobbies.join(', ');
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onSubmit() {
    const updatedData = {
      name: this.enteredName,
      location: this.enteredLocation,
      education: this.enteredEducation,
      job: this.enteredJob,
      hobbies: this.enteredHobbies.split(',').map((hobby) => hobby.trim()), // Convert string to array
    };

    this.http.post(`${environment.backendUrl}/about`, updatedData).subscribe(
      (response) => {
        console.log('User data updated successfully:', response);
        alert('Profile updated successfully!');
      },
      (error) => {
        console.error('Error updating user data:', error);
        alert('Failed to update profile.');
      }
    );
  }
}
