import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

interface Notification {
  _id: string;
  name: string;
  email: string;
  message: string;
}

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [],
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getNotificationsData();
  }

  onDelete(notificationId: string) {
    this.http
      .delete(`${environment.backendUrl}/contact/${notificationId}`)
      .subscribe(
        (response) => {
          console.log('Message deleted successfully', response);
          this.notifications = this.notifications.filter(
            (notification) => notification._id !== notificationId
          );
        },
        (error) => {
          console.error('Error deleting message:', error);
        }
      );
  }

  getNotificationsData() {
    this.http
      .get<Notification[]>(`${environment.backendUrl}/contact`)
      .subscribe(
        (data) => {
          this.notifications = data;
        },
        (error) => {
          console.error('Error fetching notifications:', error);
        }
      );
  }
}
