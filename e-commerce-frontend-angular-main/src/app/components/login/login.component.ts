import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.authService
      .login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value
      )
      .subscribe(
        {
          next: () => {
            this.authService.loggedIn = true;
          },
          error: (err) => {
            this.showError = true;
            console.log(err);
          },
          complete: () => {
            this.router.navigate(['home']);
          }
        }
      );
  }

  register(): void {
    this.router.navigate(['register']);
  }
}
