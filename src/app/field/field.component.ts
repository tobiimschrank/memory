import {Component, OnInit, Input} from '@angular/core';
import {CardService} from '../card/card.service';
import {GameService} from '../game/game.service';
import {Card} from '../card/card';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

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
  cellWidth: SafeStyle;

  field = [];

  /**
   *
   * @param cardService
   * @param gameService
   * @param sanitizer
   */
  constructor(private cardService: CardService, private gameService: GameService, private sanitizer: DomSanitizer) {
  }

  /**
   *
   */
  ngOnInit() {
    this.cellWidth = this.sanitizer.bypassSecurityTrustStyle('width:' + (100 / this.columns) + '%;');
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
