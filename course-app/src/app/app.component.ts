import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {AuthenticationService} from './core/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cinema-app';
  hasLoggedUser: boolean;

  destroy$ = new Subject<boolean>();

  constructor(private authService: AuthenticationService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.getHasLoggedIn().pipe(
      takeUntil(this.destroy$)
    ).subscribe(response => this.hasLoggedUser = response);
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigate(['auth/login']);
  }
}
