import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signUpUrl = 'http://localhost:8888'; // End Point For Signup

  constructor(private http: HttpClient) {}

  // Log in method 
  logIn(user: any): void {
    console.log(user);
  }

  // Sign up method
  signUp(user: any): Observable<any> {
    const url = `${this.signUpUrl}/signup`;

    // Set headers if needed
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    // Post request
    return this.http.post<any>(url, user, { headers })
  }

}
