import {Component, OnInit, Input} from '@angular/core';

import {CardService} from '../card.service';
import {Card} from '../card';
import {GameService} from "../game.service";

@Component({
  selector: 'app-field',
  templateUrl: './field.component.html',
  styleUrls: ['./field.component.css']
})
export class FieldComponent implements OnInit {

  @Input()
  rows: number = 4;
  @Input()
  columns: number = 4;

  field = [];

  constructor(private cardService: CardService, private gameService: GameService) {
  }

  buildTileList() {
    for (let c = this.columns; c--;) {
      let row = [];

      for (let r = this.rows; r--;) {
        row.push(this.cardService.getRandomCard());
      }

      this.field.push(row);
    }
  }

  flipCard(card) {
    this.gameService.addFlippedCard(card);
  }

  ngOnInit() {
    this.buildTileList();
  }
}
