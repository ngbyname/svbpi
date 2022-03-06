import { Component, OnInit } from '@angular/core';
import { MatCarousel, MatCarouselComponent } from '@ngmodule/material-carousel';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides = [
    {'image': 'assets/image/side-img.jpeg'},
    {'image': 'assets/image/side-img.jpeg'},
    {'image': 'assets/image/side-img.jpeg'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
