import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Course} from '../../../core/models/course.interface';

@Component({
  selector: 'app-course-td-form',
  templateUrl: './course-td-form.component.html',
  styleUrls: ['./course-td-form.component.scss']
})
export class CourseTdFormComponent implements OnInit {

  @ViewChild('form') ngForm: NgForm;

  course: Course;

  constructor() {
    this.course = {
      title: '',
      director: '',
      rating: 0
    };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.ngForm);
    console.log(this.ngForm.form.value);
  }

}
