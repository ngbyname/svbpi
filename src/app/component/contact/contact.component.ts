import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  public pageTitleText:string="Contact Us";
  imageSrc:string='assets/images/contact-us.webp';
  constructor() { }

  ngOnInit(): void {
  }

}
