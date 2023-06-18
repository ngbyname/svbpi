import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Output() sideNavClose = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }
  /**
   *
   */
  public onSideNavClose = () => {
    this.sideNavClose.emit();
  }
}
