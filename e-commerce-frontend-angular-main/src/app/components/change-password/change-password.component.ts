import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserProfileService } from 'src/app/services/user-profile-service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false
  }

  oldPassword: string = "";
  newPassword1: string = "";
  newPassword2: string = "";

  constructor(private as: AuthService, private us: UserProfileService, private router: Router) { }

  getUser() {
    this.as.getSession().subscribe({
      next: (data: any) => {
        //console.log(this.user);
        this.user = data;
        //console.log(this.user);
        this.us.getUser(this.user.id).subscribe({
          next: (data: any) => {
            this.user = data.body;
          }
        });
      }
    });
  }

  updatePassword() {
    if (this.oldPassword == this.user.password) {
      if (this.newPassword1 == this.newPassword2) {
        this.user.password = this.newPassword1;
        this.us.updateUser(this.user).subscribe({
          next: (data: any) => {
            this.user = data;
            this.router.navigate(["/user-profile"]);
          }
        });
      }
    }
  }

  ngOnInit(): void {
    this.getUser();
  }

}
