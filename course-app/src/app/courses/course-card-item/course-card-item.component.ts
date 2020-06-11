import {Component, Input, Output, EventEmitter, OnInit} from '@angular/core';
import {Course} from '../../core/models/course.interface';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-course-card-item',
  templateUrl: './course-card-item.component.html',
  styleUrls: ['./course-card-item.component.scss']
})
export class CourseCardItemComponent implements OnInit {

  @Input() course: Course;

  @Output() courseSelected = new EventEmitter<string>();
  @Output() courseDeleted = new EventEmitter<number>();

  isAdmin = false

  constructor(
    private authService: AuthenticationService
  ) {
    this.course = {
      title: '',
      director: '',
      rating: 0
    };
  }

  ngOnInit() {
    this.isAdmin = this.authService.getIsAdmin()
  }

  getDescription(): string {
    if (this.course.description.length > 100) {
      return `${this.course.description.substr(0, 100)}...`;
    }

    return this.course.description;
  }

  addFavourite(): void {
    this.courseSelected.emit(this.course.title);
  }

  onDeleteClick(): void {
    this.courseDeleted.emit(this.course.id);
  }
}
