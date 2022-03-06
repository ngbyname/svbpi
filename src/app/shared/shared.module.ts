import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './navigation/navigation.component';
import { SliderComponent } from './slider/slider.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import {MaterialModule} from '../../material.module';
@NgModule({
  declarations: [NavigationComponent, SliderComponent, FooterComponent, HeaderComponent],
  imports: [
    CommonModule,
    MaterialModule,

  ],
  exports:[HeaderComponent,NavigationComponent,FooterComponent]
})
export class SharedModule { }
