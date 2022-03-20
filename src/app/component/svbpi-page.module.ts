import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentComponent} from './component.component';
import {HomeComponent} from './home/home.component'
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import{ResultComponent} from './result/result.component';
import { AdmitcardComponent } from './admitcard/admitcard.component';
import { CoursesComponent } from './courses/courses.component';
@NgModule({
  declarations: [ComponentComponent,HomeComponent,ResultComponent,AdmitcardComponent,CoursesComponent],
  imports: [
    CommonModule,
    MatCarouselModule.forRoot(),
    ReactiveFormsModule
  ],
  exports:[

  ]
})
export class SvbpiPageModule { }
