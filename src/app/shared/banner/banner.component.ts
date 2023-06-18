import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent implements OnInit {

  @Input() pageTitle: String;
  @Input() isHome:boolean=false;
  @Input() pageImageSrc:string='';
  imageObject:any;
  constructor() { }

  ngOnInit(): void {

  }
  public setBackground(imgSrc){
    const style: any = {};
    style['background-image'] = imgSrc;
    return style;
  }
}
