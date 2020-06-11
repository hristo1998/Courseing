import {Component, OnInit, OnDestroy} from '@angular/core';
import {Course} from '../../core/models/course.interface';
import { CoursesService } from 'src/app/core/services/courses.service';
import { Subject } from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.scss']
})
export class CoursesTableComponent implements OnInit, OnDestroy {
  showError: boolean;
  courseInput: string;
  courses: Course[]

  destroy$ = new Subject<boolean>();

  isAdmin = false

  constructor(
    private coursesService: CoursesService,
    private authService: AuthenticationService
    ) {
  }

  ngOnInit() {
    this.getCourses() 
    this.isAdmin = this.authService.getIsAdmin()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }
  
  private getCourses(searchValue?: string): void {
    this.coursesService.getCourses(searchValue).pipe(
      // map(response => response.filter(x => x.rating > 7)),
      takeUntil(this.destroy$)
    ).subscribe(response => {
      this.courses = response;
    }, error => {
      console.log(error);
    });
  }
}
