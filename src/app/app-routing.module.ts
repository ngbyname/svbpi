import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutUsComponent } from './component/about-us/about-us.component';
import { AdmitcardComponent } from './component/admitcard/admitcard.component';
import { ContactComponent } from './component/contact/contact.component';
import { CoursesComponent } from './component/courses/courses.component';
import { HomeComponent } from './component/home/home.component';
import { ResultComponent } from './component/result/result.component';
const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '**', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutUsComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'result', component: ResultComponent },
  { path: 'admitcard', component: AdmitcardComponent },
  { path: 'courses', component:CoursesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
