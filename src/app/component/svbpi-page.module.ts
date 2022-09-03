import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentComponent} from './component.component';
import {HomeComponent} from './home/home.component'
import { MatCarouselModule } from '@ngmodule/material-carousel';
import { ReactiveFormsModule } from '@angular/forms';
import{RegisterComponent} from './register/register.component';
import { AdmitcardComponent } from './admitcard/admitcard.component';
// import { CoursesComponent } from './courses/courses.component';
import {NgxPrintModule} from 'ngx-print';
import { SharedModule } from '../shared/shared.module';
@NgModule({
  declarations: [ComponentComponent,HomeComponent,RegisterComponent],
  imports: [
    CommonModule,
    MatCarouselModule.forRoot(),
    ReactiveFormsModule,
    NgxPrintModule,
    SharedModule
  ],
  exports:[

  ]
})
export class SvbpiPageModule { }
