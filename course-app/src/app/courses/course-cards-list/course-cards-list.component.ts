import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {Course} from '../../core/models/course.interface';
import {CoursesService} from '../../core/services/courses.service';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-course-cards-list',
  templateUrl: './course-cards-list.component.html',
  styleUrls: ['./course-cards-list.component.scss']
})
export class CoursesCardsListComponent implements OnInit, OnDestroy {

  courses: Course[];

  formGroup: FormGroup;

  destroy$ = new Subject<boolean>();

  isAdmin = false
  favouriteCourses: string

  constructor(private coursesService: CoursesService,
              private fb: FormBuilder,
              private authService: AuthenticationService) {
  }

  ngOnInit(): void {
    this.getCourses();

    this.formGroup = this.fb.group({
      search: ['']
    });

    this.isAdmin = this.authService.getIsAdmin()
    this.favouriteCourses = this.authService.getFavouriteCourses()
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onCourseSelected(title: string): void {
    let user = this.authService.getLoggedUser()

    if(!user.favouriteMovies.includes(title)) {
      if(user.favouriteMovies.length > 0) {
        title = `, ${title}`
      }
      user.favouriteMovies = `${user.favouriteMovies}${title}`

      this.authService.updateUser(user).pipe(
          takeUntil(this.destroy$)
        ).subscribe(_ => {
          this.authService.setLoggedUser(user)
          this.favouriteCourses = user.favouriteMovies
        });
    }
  }

  onSearch(): void {
    // get title from form
    const searchValue = this.formGroup.controls.search.value;

    this.getCourses(searchValue);
  }

  onClearSearch(): void {
    this.formGroup.get('search').setValue(null);

    this.getCourses();
  }

  onDelete(id: number): void {
    this.coursesService.deleteCourse(id).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() => {
      this.getCourses();
    });
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
