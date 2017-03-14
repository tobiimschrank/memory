import {Component, OnInit} from '@angular/core';

import {CardService} from './card.service';
import {Card} from './card';
import {PlayerService} from './player/player.service';
import {Player} from './player/player';
import {GameService} from './game/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  playersAtStart = 2;

  forPair: number = 2;
  rows: number = 4;
  columns: number = 4;
  cards: Card[];
  players: Player[] = [];

  error: string = null;

  gameRunning: boolean = false;
  gameEnded: boolean = false;

  constructor(private cardService: CardService, private playerService: PlayerService, private gameService: GameService) {
  }

  ngOnInit(): void {
    for (let i = this.playersAtStart; i--;) {
      this.addPlayer();
    }
  }

  getCards(): void {
    this.cardService.buildCards(this.forPair, this.rows * this.columns).then((cards) => this.cards = cards);
  }

  startGame() {
    if ((this.rows * this.columns) % this.forPair > 0) {
      this.error = 'Bitte wähle eine andere Anzahl von Zeilen und Spalten aus, da ansonsten Karten übrig bleiben würden.';
      return;
    }

    this.error = null;

    this.getCards();
    this.gameRunning = true;

    this.gameService.start(this.forPair).then((gameEnded) => this.gameEnded = gameEnded);
  }

  reset() {
    this.forPair = 2;
    this.rows = 4;
    this.columns = 4;

    this.gameEnded = false;
    this.gameRunning = false;

    this.playerService.resetPlayers(true);
    this.gameService.reset();
  }

  restart() {
    this.gameEnded = false;
    this.gameRunning = false;

    this.playerService.resetPlayers();
    this.gameService.reset();
    this.startGame();
  }

  addPlayer(): void {
    this.playerService.createPlayer('Player ' + (this.players.length + 1));
    this.players = this.playerService.getPlayers();
  }

  showCards(player: Player){
    console.log('show');
    player.showCards();
  }

  hideCards(player: Player){
    console.log('hide');
    player.hideCards();
  }
}
