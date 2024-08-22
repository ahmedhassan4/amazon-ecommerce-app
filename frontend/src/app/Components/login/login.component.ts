import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LogUser } from '../../models/LogUser';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
// Template Driven
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData: LogUser = {} as LogUser; //default value

  constructor(private authServ:AuthService) {}

//use login method into auth service to add user
    addUser () { 
        this.authServ.logIn(this.formData) 
    };
}
