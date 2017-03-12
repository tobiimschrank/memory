import {Component, Input} from '@angular/core';

import {CardService} from './card.service';
import {Card} from './card';
import {GameService} from "./game.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  forPair: number = 2;
  rows: number = 4;
  columns: number = 4;
  cards: Card[];

  error: string = null;

  gameRunning: boolean = false;
  gameEnded: boolean = false;

  constructor(private cardService: CardService, private gameService: GameService) {
  }

  getCards(): void {
    this.cardService.buildCards(this.forPair, this.rows * this.columns).then(cards => this.cards = cards);
  }

  startGame() {
    if ((this.rows * this.columns) % this.forPair > 0) {
      this.error = 'Bitte wähle eine andere Anzahl von Zeilen und Spalten aus, da ansonsten Karten übrig bleiben würden.';
      return;
    }

    this.error = null;

    this.getCards();
    this.gameRunning = true;

    this.gameService.start(this.forPair, this.cardService).then(gameEnded => this.gameEnded = gameEnded);
  }

  reset() {
    this.forPair = 2;
    this.rows = 4;
    this.columns = 4;

    this.gameEnded = false;
    this.gameRunning = false;

    this.gameService.reset();
  }

  restart() {
    this.gameEnded = false;
    this.gameRunning = false;

    this.gameService.reset();
    this.startGame();
  }
}
