import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';
import { UserService } from '../user.service';
import { UserProfile } from '../user-profile';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  @Input() user: User;
  @Input() roles: UserProfile[] = [];
  selectedRoles: UserProfile[] = [];
  edit: boolean;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private location: Location) { }

  ngOnInit() {
    this.getUser();
    this.getRoles();
  }

  getRoles(): void {
    this.userService.getRoles()
      .subscribe(data => this.roles = data);
  }

  getUser(): void {
    const ssoId = this.route.snapshot.paramMap.get('ssoId');
    if (ssoId) {
      this.edit = true;
      this.userService.getUser(ssoId)
        .subscribe(data => this.user = data);
    }
    this.user = new User();
  }

  goBack(): void {
    this.location.back();
  }

  addUser(): void {
    this.user.userProfiles = this.selectedRoles;
    if (this.validateUser()) {
      this.userService.addUser(this.user)
        .subscribe(() => this.goBack());
    }
  }

  editUser(): void {
    if (this.validateUser()) {
      this.userService.editUser(this.user)
        .subscribe(() => this.goBack());
    }
  }

  private validateUser(): boolean {
    if (this.user.firstName && this.user.lastName && this.user.email && this.user.password && this.user.ssoId && this.user.userProfiles.length > 0) {
      return true;
    }
    return false;
  }



}
