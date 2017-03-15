import {Component, OnInit, Input} from '@angular/core';
import {Card} from './card';

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

  /**
   *
   */
  constructor() {
  }

  /**
   *
   */
  ngOnInit() {
  }
}
