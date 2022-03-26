import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ComponentComponent } from './component/component.component';
import { HomeComponent } from './component/home/home.component';
import { ContactComponent } from './component/contact/contact.component';
import { RegisterComponent } from './component/register/register.component';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { SharedModule } from './shared/shared.module';
// import { MatSliderModule } from '@angular/material/slider';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdmitcardComponent } from './component/admitcard/admitcard.component';
import { SearchComponent } from './component/search/search.component';
import {ErrorCatchingInterceptor} from './core/interceptors/error-catching.interceptor';
import { ApiInterceptor } from './core/interceptors/api-interceptor';
import { CoursesComponent } from './component/courses/courses.component';
import { ShowResultComponent } from './component/showresult/showresult.component';
import { MatSelectModule } from '@angular/material/select';
// import { FlexLayoutModule } from '@angular/flex-layout';
@NgModule({
  declarations: [
    AppComponent,
    ComponentComponent,
    HomeComponent,
    ContactComponent,
    RegisterComponent,
    AboutUsComponent,
    AdmitcardComponent,
    SearchComponent,
    CoursesComponent,
    ShowResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatSelectModule
    // FlexLayoutModule
  ],
  providers: [
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: ApiInterceptor,
    //   multi: true
    // }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
