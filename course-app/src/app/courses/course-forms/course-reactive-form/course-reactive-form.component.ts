import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {CoursesService} from '../../../core/services/courses.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Course} from '../../../core/models/course.interface';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-course-reactive-form',
  templateUrl: './course-reactive-form.component.html',
  styleUrls: ['./course-reactive-form.component.scss']
})
export class CourseReactiveFormComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  course: Course;

  destroy$ = new Subject<boolean>();

  constructor(private fb: FormBuilder,
              private router: Router,
              private route: ActivatedRoute,
              private coursesService: CoursesService) {
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.destroy$)
    ).subscribe(params => {
      if (params.id) {
        this.coursesService.getCourseById(params.id).pipe(
          takeUntil(this.destroy$)
        ).subscribe(response => {
          this.course = response;

          this.buildForm();
        });
      }
    });

    this.buildForm();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  onSubmit(): void {
    const course = this.formGroup.value;

    this.coursesService.saveCourse(course).pipe(
      takeUntil(this.destroy$)
    ).subscribe(() =>
      this.router.navigate(['/card-list']));
  }

  private buildForm(): void {
    if (!this.course) {
      this.course = {
        title: '',
        director: '',
        rating: 0
      };
    }

    this.formGroup = this.fb.group({
      id: [this.course.id],
      title: [this.course.title, [Validators.required, Validators.minLength(5)]],
      description: [this.course.description, [Validators.required]],
      director: [this.course.director],
      rating: [this.course.rating],
    });
  }
}
