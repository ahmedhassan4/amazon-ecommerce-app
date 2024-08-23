import { Injectable } from '@angular/core';
import { LogUser } from '../../models/LogUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  logIn(user: LogUser) { 
    console.log(user);
  }

  signUp (user: any) { 
    console.log(user)
  }
}
