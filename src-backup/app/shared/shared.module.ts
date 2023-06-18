import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../../material.module';
import { BannerComponent } from './banner/banner.component';
import { RouterModule } from '@angular/router';
import { RegistrationFormComponent } from './registration-form/registration-form.component';
import { FormatTitlePipe } from '../core/pipe/format-title.pipe';
import { MatStepperModule } from '@angular/material/stepper';
import {ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [NavigationComponent, SliderComponent, FooterComponent, HeaderComponent, BannerComponent, RegistrationFormComponent,FormatTitlePipe],
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    MatStepperModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ],
  exports:[HeaderComponent, NavigationComponent, FooterComponent, BannerComponent,RegistrationFormComponent]
})
export class SharedModule { }
