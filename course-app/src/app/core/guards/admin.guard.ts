import {Injectable} from '@angular/core';
import {CanLoad, Router} from '@angular/router';
import {AuthenticationService} from '../services/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  canLoad(): boolean {
    const isAdmin = this.authService.getIsAdmin();
    if (!isAdmin) {
      this.router.navigate(['courses/card-list']);

      return false;
    }

    return true;
  }
}
