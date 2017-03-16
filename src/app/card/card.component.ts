import {Component, OnInit, Input} from '@angular/core';
import {Card} from './card';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  card: Card;
  @Input()
  alwaysVisible: boolean = false;
  @Input()
  rotate: boolean = false;

  stackRotate: SafeStyle;

  /**
   *
   * @param {DomSanitizer} sanitizer
   */
  constructor(private sanitizer: DomSanitizer) {
    // rotate between -90 and 90 degree
    let rotation: number = Math.random() * 180 - 90;
    this.stackRotate = this.sanitizer.bypassSecurityTrustStyle('transform: rotate(' + rotation + 'deg);');
  }

  /**
   *
   */
  ngOnInit() {
  }
}
