import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface LoginResponse {
  role: string;
  message: string;
  token: string;
}

@Injectable({ providedIn: 'root' })
export class LoginService {
  private apiUrl = `${environment.backendUrl}/login`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    console.log('loggin in');

    return this.http.post<LoginResponse>(this.apiUrl, { email, password });
  }
}
