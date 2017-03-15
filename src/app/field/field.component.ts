import {Component, OnInit, Input} from '@angular/core';
import {CardService} from '../card/card.service';
import {GameService} from '../game/game.service';
import {Card} from '../card/card';

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

  /**
   *
   * @param {CardService} cardService
   * @param {GameService} gameService
   */
  constructor(private cardService: CardService, private gameService: GameService) {
  }

  /**
   *
   */
  ngOnInit() {
    this._buildTileList();
  }

  /**
   *
   * @private
   */
  _buildTileList(): void {
    for (let c = this.rows; c--;) {
      let row = [];

      for (let r = this.columns; r--;) {
        row.push(this.cardService.getRandomCard());
      }

      this.field.push(row);
    }
  }

  /**
   *
   * @param {Card} card
   */
  flipCard(card: Card): void {
    this.gameService.addFlippedCard(card);
  }
}
