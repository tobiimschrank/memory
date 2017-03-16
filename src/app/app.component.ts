import {Component, OnInit} from '@angular/core';
import {PlayerService} from './player/player.service';
import {Player} from './player/player';
import {GameService} from './game/game.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  _playersAtStart = 2;

  forPair: number = 2;
  rows: number = 4;
  columns: number = 4;
  type: string = 'default';
  players: Player[] = [];
  winnerNames: string[] = [];

  error: string = null;

  gameRunning: boolean = false;
  gameEnded: boolean = false;

  /**
   *
   * @param {PlayerService} _playerService
   * @param {GameService} _gameService
   */
  constructor(private _playerService: PlayerService, private _gameService: GameService) {
  }

  /**
   *
   */
  ngOnInit(): void {
    this._buildPlayers();
  }

  /**
   *
   */
  startGame(): void {
    if ((this.rows * this.columns) % this.forPair > 0) {
      this.error = 'Bitte wähle eine andere Anzahl von Zeilen und Spalten aus, da ansonsten Karten übrig bleiben würden.';
      return;
    }

    this.error = null;

    this._getCards();
    this.gameRunning = true;

    this._gameService.start(this.forPair).then(() => this._onGameEnd());
  }

  /**
   *
   * @param {boolean} hard
   */
  reset(hard: boolean = false): void {
    if (hard) {
      this.forPair = 2;
      this.rows = 4;
      this.columns = 4;
      this.players = [];
    }

    this.gameEnded = false;
    this.gameRunning = false;

    this._playerService.resetPlayers(hard);
    this._gameService.reset();

    if (hard) {
      this._buildPlayers();
    } else {
      this.players = this._playerService.getPlayers();
      this.startGame();
    }
  }

  /**
   *
   */
  addPlayer(): void {
    this._playerService.createPlayer('Player ' + (this.players.length + 1));
    this.players = this._playerService.getPlayers();
  }

  /**
   *
   */
  removePlayer(): void {
    this._playerService.removePlayer();
    this.players = this._playerService.getPlayers();
  }

  /**
   *
   * @private
   */
  _buildPlayers(): void {
    for (let i = this._playersAtStart; i--;) {
      this.addPlayer();
    }
  }

  /**
   *
   * @private
   */
  _getCards(): void {
    this._gameService.generateCards(this.forPair, this.rows * this.columns, this.type);
  }

  /**
   *
   * @private
   */
  _onGameEnd(): void {
    this.gameEnded = true;
    this.winnerNames = this._playerService.getWinner();
  }
}
