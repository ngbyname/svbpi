import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  slides = [
    {'image': 'assets/img/background1.jpeg'},
    {'image': 'assets/img/background2.jpeg'},
    {'image': 'assets/img/background3.jpeg'}
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
