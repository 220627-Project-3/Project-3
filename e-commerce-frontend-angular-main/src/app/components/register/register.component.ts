import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    fname: new FormControl(''),
    lname: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  showError: boolean = false;

  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) {}

  ngOnInit(): void {}

  onSubmit(event: Event): void {
    const form = event.currentTarget as HTMLFormElement;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      this.authService
        .register(
          this.registerForm.get('fname')?.value,
          this.registerForm.get('lname')?.value,
          this.registerForm.get('email')?.value,
          this.registerForm.get('password')?.value
        )
        .subscribe({
          next: () => {
            console.log('New user registered');
          },
          error: (err) => {
            this.showError = true;
            this.toastr.error("Try a different email", "Registration Failed")
            console.log(err);
            
          },
          complete: () => {
            this.toastr.success("Registration Successful, Log In to the Swag Shop", "Registration Successful")
            this.router.navigate(['login']);
            
          },
        });
    }
    form.classList.add('was-validated');
  }
}
