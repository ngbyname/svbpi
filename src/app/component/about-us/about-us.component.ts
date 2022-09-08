import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  public pagetTitleText:string="About Us";
  imageSrc:string='assets/images/banner1.jpg';
  constructor() { }

  ngOnInit(): void {
  }

}
