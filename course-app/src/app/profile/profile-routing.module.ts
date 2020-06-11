import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';

const routes: Route[] = [
  // {
  //   path: '',
  //   redirectTo: 'profile',
  //   component: AuthComponent,
  //   children: [
      {
        path: '',
        component: ProfileComponent
      },
  //   ]
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
