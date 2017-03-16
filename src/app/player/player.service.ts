import {Injectable} from '@angular/core';
import {Player} from './player';
import {Card} from '../card/card';

@Injectable()
export class PlayerService {
  _players: Player[] = [];
  _currentPlayerIndex: number = -1;
  _currentPlayer: Player;

  /**
   *
   * @param {string} name
   * @returns {Player}
   */
  createPlayer(name: string = ''): Player {
    let newPlayer: Player = new Player(name);
    this._players.push(newPlayer);

    return newPlayer;
  }

  /**
   *
   */
  removePlayer(): void {
    this._players.pop();
  }

  /**
   *
   * @returns {Player[]}
   */
  getPlayers(): Player[] {
    return this._players;
  }

  /**
   *
   * @param {number} pointsToAdd
   */
  addPointsForCurrentPlayer(pointsToAdd: number = 1): void {
    this._currentPlayer.points += pointsToAdd;
  }

  /**
   *
   * @returns {Player}
   */
  nextPlayer(): Player {
    if (this._currentPlayer) {
      this._currentPlayer.isActive = false;
    }

    this._currentPlayerIndex++;
    if (this._currentPlayerIndex >= this._players.length) {
      this._currentPlayerIndex = 0;
    }

    this._currentPlayer = this._players[this._currentPlayerIndex];
    this._currentPlayer.isActive = true;

    return this._currentPlayer;
  }

  /**
   *
   * @param {boolean} hard
   */
  resetPlayers(hard: boolean = false): void {
    if (hard) {
      this._players = [];
    } else {
      for (let player of this._players) {
        player.points = 0;
        player.cards = [];
        player.isActive = false;
      }
    }

    this._currentPlayerIndex = -1;
    this._currentPlayer = null;
  }

  /**
   *
   * @returns {string[]}
   */
  getWinner(): string[] {
    let winners: string[] = [],
      playerClone: Player[] = Object.assign(this._players),
      sortedPlayers: Player[] = playerClone.sort(this._compare),
      highestPoints: number = 0;

    for (let s: number = 0; s < sortedPlayers.length; s++) {
      let currentPlayer: Player = sortedPlayers[s];
      if (currentPlayer.points > highestPoints) {
        highestPoints = currentPlayer.points;
      }

      if (currentPlayer.points < highestPoints) {
        break;
      }

      winners.push(currentPlayer.name);
    }

    return winners;
  }

  /**
   *
   * @param {Card[]} cards
   */
  addCardsToCurrentPlayer(cards: Card[]): void {
    for (let card of cards) {
      this._currentPlayer.addCard(card);
    }
  }

  /**
   *
   * @param {Player} a
   * @param {Player} b
   * @returns {number}
   * @private
   */
  _compare(a: Player, b: Player): number {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  }
}
