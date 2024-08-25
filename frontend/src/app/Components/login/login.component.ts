import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LogUser } from '../../models/LogUser';
import { AuthService } from '../../services/auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  formData: LogUser = {} as LogUser; 
  authMessage :string = ''
  constructor(private authServ:AuthService, private router: Router) {}

    addUser () { 
       this.authServ.logIn(this.formData).subscribe(response => {
        localStorage.setItem("access-token" , response.token)
        console.log("user",response);
        
        this.authMessage = "login successful !"
        this.authServ.user.next(true)
        setTimeout(() => { 
        this.router.navigate(["/"]);
        }, 2000)
       },
      error => { 
        console.log("sign in error", error)
        this.authMessage = "email or password invalid"
      }) 
    };
}
