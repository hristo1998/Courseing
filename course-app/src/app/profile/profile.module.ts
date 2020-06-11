import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {ProfileRoutingModule} from './profile-routing.module';
import {CommonModule} from '@angular/common';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    ProfileRoutingModule,
    FormsModule
  ],
  declarations: [
    ProfileComponent
  ]
})
export class ProfileModule {
}
