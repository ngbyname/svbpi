import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ComponentComponent} from './component.component';
import {HomeComponent} from './home/home.component'
import { MatCarouselModule } from '@ngmodule/material-carousel';
@NgModule({
  declarations: [ComponentComponent,HomeComponent],
  imports: [
    CommonModule,
    MatCarouselModule.forRoot()
  ],
  exports:[

  ]
})
export class SvbpiPageModule { }
