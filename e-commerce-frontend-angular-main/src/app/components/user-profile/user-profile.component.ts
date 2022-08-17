import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserProfileService } from 'src/app/services/user-profile-service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User = {
    id: 0,
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    admin: false
  };

  constructor(private us: UserProfileService, private as: AuthService) { }

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
        //this.as.setUser(this.user);
      }
    });
  }

  updateUser() {
    this.us.updateUser(this.user).subscribe({
      next: (data:any) => {
        this.user = data;
        //this.as.setUser(this.user);
      }
    });
  }

  ngOnInit(): void {
    this.getUser();
  }

}