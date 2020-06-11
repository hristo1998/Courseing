import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoursesRoutingModule} from './courses-routing.module';
import {CoursesTableComponent as CoursesTableComponent} from './courses-table/courses-table.component';
import {CoursesCardsListComponent as CoursesCardsListComponent} from './course-cards-list/course-cards-list.component';
import {CourseCardItemComponent as CourseCardItemComponent} from './course-card-item/course-card-item.component';
import {CourseTdFormComponent as CourseTdFormComponent} from './course-forms/course-td-form/course-td-form.component';
import {CourseReactiveFormComponent as CourseReactiveFormComponent} from './course-forms/course-reactive-form/course-reactive-form.component';
import {CoursesComponent} from './courses.component';
import {CommonModule} from '@angular/common';
import {CoreModule} from '../core/core.module';
import {FormatPipe} from './pipes/format.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule,
    CoursesRoutingModule
  ],
  declarations: [
    FormatPipe,
    CoursesComponent,
    CoursesTableComponent,
    CoursesCardsListComponent,
    CourseCardItemComponent,
    CourseTdFormComponent,
    CourseReactiveFormComponent
  ]
})
export class CoursesModule {
}
