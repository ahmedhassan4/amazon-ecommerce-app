import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private authServ: AuthService, private router: Router) {}

  formData: FormGroup = new FormGroup({
    fullName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(7)]),
    rePassword: new FormControl('', [Validators.required])
  });

  authMessage: string = '';

  get fullName() {
    return this.formData.get('fullName');
  }

  get email() {
    return this.formData.get('email');
  }

  get password() {
    return this.formData.get('password');
  }

  get rePassword() {
    return this.formData.get('rePassword');
  }

  passwordMismatch(): boolean {
    return this.password?.value !== this.rePassword?.value;
  }

  addUser() {
    if (this.formData.invalid || this.passwordMismatch()) {
      return;
    }

    const formValue = { ...this.formData.value };
    delete formValue.rePassword;  

    this.authServ.signUp(formValue).subscribe(
      response => {
        console.log('User signed up successfully:', response);
        this.authMessage = 'Signup successful!';

        // Navigate to login page after a delay
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      },
      error => {
        console.error('Sign up failed:', error);
        this.authMessage = 'Signup failed. Please try again.';
      }
    );
  }
}
