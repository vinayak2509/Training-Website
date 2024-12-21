import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewMessageData } from './contact.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ContactService {
  private apiUrl = `${environment.backendUrl}/contact`;

  constructor(private http: HttpClient) {}

  addMessageToServer(messageData: NewMessageData): Observable<any> {
    return this.http.post<any>(this.apiUrl, messageData);
  }
}
