import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAppComponent } from './user-app/user-app.component';
import { EditUserComponent } from './edit-user/edit-user.component';

const routes: Routes = [
  { path: '', component: UserAppComponent },
  { path: 'usersList', component: UserAppComponent },
  { path: 'newUser', component: EditUserComponent },
  { path: 'addUser', component: EditUserComponent },
  { path: 'editUser/:ssoId', component: EditUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
