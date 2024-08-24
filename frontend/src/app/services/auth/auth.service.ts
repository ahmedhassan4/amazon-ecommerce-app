import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: BehaviorSubject<boolean>;

  
  // private baseUrl = 'http://localhost:3000/api/v1'; // backend url
  private baseUrl = 'http://localhost:8888'; // backend url

  constructor(private http: HttpClient, router: Router) {
    this.user = new BehaviorSubject<boolean>(this.isLogged)
  }

  // Log in method 
  logIn(user: any): Observable<any>{
    const url =`${this.baseUrl}/signin` // Sign In End Point
    //  const headers = new HttpHeaders({ // set header if you needed
    //   'Content-Type': 'application/json',
    // });
    return this.http.post<any>(url, user) //post data to end point sing in
  }

  // Sign up method
  signUp(user: any): Observable<any> {
    const url = `${this.baseUrl}/signup`; // Sign up end point
    return this.http.post<any>(url, user) // Post request
  }

  // Logout Method
  logOut() { 
    localStorage.removeItem("access-token");
    this.user.next(false);
  }

  // LocalStorage checking
  get isLogged () { 
    return localStorage.getItem("access-token") ? true : false
  }

  // Get status
  getUserState () :Observable<boolean> { 
   return this.user.asObservable()
  }
}
