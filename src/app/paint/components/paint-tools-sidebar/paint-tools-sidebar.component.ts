import { Component, OnInit } from '@angular/core';
import { PaintService } from '../../services/paint.service';


@Component({
  selector: 'app-paint-tools-sidebar',
  templateUrl: './paint-tools-sidebar.component.html',
  styleUrls: ['./paint-tools-sidebar.component.css']
})
export class PaintToolsSidebarComponent implements OnInit {
  public color: any;
  public width: number = 1;


  constructor(public paint:PaintService) { }

  ngOnInit(): void {
  }

  // funciton for the color change
  colorChange() {
    this.paint.color = this.color;
  }


  // funciton for the width change
  widthChange() {
    this.paint.setLinewidth(this.width);
  }

}
