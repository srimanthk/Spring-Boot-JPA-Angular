import { Component, OnInit, Output } from '@angular/core';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-app',
  templateUrl: './user-app.component.html',
  styleUrls: ['./user-app.component.css']
})
export class UserAppComponent implements OnInit {

  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUsersList();
  }

  getUsersList(): void {
    this.userService.getUsersList()
      .subscribe(data => this.users = data);
  }

  deleteUser(user: User): void {
    this.userService.deleteUser(user.ssoId)
      .subscribe(data => this.users = data);
  }

}
