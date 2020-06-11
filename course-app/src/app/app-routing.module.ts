import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {NonAuthenticatedGuard} from './core/guards/non-authenticated.guard';
import {AuthGuard} from './core/guards/auth.guard';

const routes: Route[] = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [NonAuthenticatedGuard]
  },
  {
    path: 'courses',
    loadChildren: () => import('./courses/courses.module').then(m => m.CoursesModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule),
    canLoad: [AuthGuard]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'courses'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
