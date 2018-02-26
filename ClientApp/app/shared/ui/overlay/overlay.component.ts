import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'hure-overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss']
})
export class OverlayComponent implements OnInit {
  @Input() isActivated:boolean=false
  constructor() { }

  ngOnInit() {
  }

}
