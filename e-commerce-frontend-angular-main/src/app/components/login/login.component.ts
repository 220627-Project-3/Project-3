import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

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
            this.toastr.success("Welcome to the Swag Shop!", "Login Successful")
          },
          error: (err) => {
            this.showError = true;
            console.log(err);
            this.toastr.error("Make sure your login credentials have not been changed in the Database", "Login Failed :(")
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
