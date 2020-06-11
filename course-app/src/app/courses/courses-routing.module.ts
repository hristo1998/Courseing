import {NgModule} from '@angular/core';
import {Route, RouterModule} from '@angular/router';
import {CoursesTableComponent} from './courses-table/courses-table.component';
import {CoursesCardsListComponent} from './course-cards-list/course-cards-list.component';
import {CourseReactiveFormComponent} from './course-forms/course-reactive-form/course-reactive-form.component';
import {CoursesComponent} from './courses.component';
import { AdminGuard } from '../core/guards/admin.guard';

const routes: Route[] = [
  {
    path: '',
    component: CoursesComponent,

    children: [
      {
        path: 'table-list',
        component: CoursesTableComponent
      },
      {
        path: 'card-list',
        component: CoursesCardsListComponent
      },
      {
        path: 'add',
        component: CourseReactiveFormComponent,
        canLoad: [AdminGuard]
      },
      {
        path: 'add/:id',
        component: CourseReactiveFormComponent,
        canLoad: [AdminGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}
