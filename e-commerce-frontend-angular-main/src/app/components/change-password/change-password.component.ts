import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/services/user-profile-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent implements OnInit {
  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false,
  };

  oldPassword: string = '';
  newPassword1: string = '';
  newPassword2: string = '';

  constructor(
    private as: AuthService,
    private us: UserProfileService,
    private router: Router,
    private ts: ToastrService
  ) {}

  getUser() {
    this.as.getSession().subscribe({
      next: (data: any) => {
        //console.log(this.user);
        this.user = data;
        //console.log(this.user);
        this.us.getUser(this.user.id).subscribe({
          next: (data: any) => {
            this.user = data.body;
          },
        });
      },
    });
  }

  updatePassword() {
    let success: boolean = false;
    if (this.oldPassword == this.user.password) {
      if (this.newPassword1 == this.newPassword2) {
        success = true;
        this.user.password = this.newPassword1;
        this.us.updateUser(this.user).subscribe({
          next: (data: any) => {
            this.user = data;
            this.ts.success('Password updated successfully');
            this.router.navigate(['/user-profile']);
          },
        });
      }
    }
    if (!success) {
      this.ts.error('Error: Please enter the correct password');
    }
  }

  ngOnInit(): void {
    this.getUser();
  }
}
