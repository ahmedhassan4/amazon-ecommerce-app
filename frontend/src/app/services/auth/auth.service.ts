import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private baseUrl = 'http://localhost:3000/api/v1'; // backend url
  private baseUrl = 'http://localhost:8888'; // backend url

  constructor(private http: HttpClient) {}

  // Log in method 
  logIn(user: any): Observable<any>{
    const url =`${this.baseUrl}/signin` //sign in end point


    //  const headers = new HttpHeaders({ //set header if you needed
    //   'Content-Type': 'application/json',
    // });
    
    return this.http.post<any>(url, user) //post data to end point sing in
  }

  // Sign up method
  signUp(user: any): Observable<any> {
    const url = `${this.baseUrl}/signup`; //sign up end point
 
    // const headers = new HttpHeaders({   // Set headers if needed
    //   'Content-Type': 'application/json',
    // });
   
    return this.http.post<any>(url, user) // Post request
  }
}
