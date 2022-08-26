import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserProfileService } from 'src/app/services/user-profile-service';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
})
export class UserProfileComponent implements OnInit {
  edit: boolean = false;

  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false,
  };

  constructor(
    private us: UserProfileService,
    private as: AuthService,
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

  updateUser() {
    this.us.updateUser(this.user).subscribe({
      next: (data: any) => {
        this.user = data;
        this.ts.success('User information updated successfully');
        // NEED A WAY TO FIX THE NAVBAR AFTER UPDATING USER INFO.
      },
    });
  }

  ngOnInit(): void {
    this.getUser();
  }
}
