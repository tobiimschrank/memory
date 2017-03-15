import {Injectable} from '@angular/core';
import {PlayerService} from '../player/player.service';
import {CardService} from '../card/card.service';
import {Card} from '../card/card';

@Injectable()
export class GameService {
  _turns: number;
  _flippedCards: Card[] = [];
  _removedCards: Card[] = [];
  _remainingTurns: number = 0;
  _repeatOnPair: boolean = true;

  _resolver: any;

  /**
   *
   * @param cardService
   * @param playerService
   */
  constructor(private cardService: CardService, private playerService: PlayerService) {
  }

  /**
   *
   */
  reset() {
    this._flippedCards = [];
    this._removedCards = [];
  }

  /**
   *
   * @param {number} turns
   * @returns {Promise<boolean>}
   */
  start(turns: number): Promise<boolean> {
    this._turns = turns;
    this.playerService.nextPlayer();

    this._startRound();

    return new Promise(function (resolve) {
      this._resolver = resolve;
    }.bind(this));
  }

  /**
   *
   */
  removeCurrentCardsFromField(): void {
    for (let flippedCard of this._flippedCards) {
      flippedCard.removed = true;
      this._removedCards.push(flippedCard);
    }
  }

  /**
   *
   * @param {Card} card
   */
  addFlippedCard(card: Card): void {
    if (card.removed || card.flipped || this._remainingTurns === 0) {
      return;
    }

    this._flippedCards.push(card);
    card.flipped = true;

    this._remainingTurns--;

    if (this._remainingTurns === 0) {
      window.setTimeout(this._endRound.bind(this), 1000);
    }
  }

  /**
   *
   */
  hideFlippedCards(): void {
    for (let flippedCard of this._flippedCards) {
      flippedCard.flipped = false;
    }
  }

  /**
   *
   * @private
   */
  _startRound(): void {
    this._flippedCards = [];
    this._remainingTurns = this._turns;
  }

  /**
   *
   * @private
   */
  _endRound(): void {
    if (this._checkForPairs()) {
      this.playerService.addPointsForCurrentPlayer();
      this.removeCurrentCardsFromField();

      this.playerService.addCardsToCurrentPlayer(this._flippedCards);
      if (!this._repeatOnPair) {
        this.playerService.nextPlayer();
      }
    } else {
      this.hideFlippedCards();
      this.playerService.nextPlayer();
    }

    if (this.cardService.countPairs() === this._removedCards.length / this._turns) {
      this._resolver(true);
      return;
    }

    this._startRound();
  }

  /**
   *
   * @returns {boolean}
   * @private
   */
  _checkForPairs(): boolean {
    let lastKey = null;

    for (let flippedCard of this._flippedCards) {
      if (lastKey === null) {
        lastKey = flippedCard.key;
        continue;
      }

      if (lastKey !== flippedCard.key) {
        return false;
      }
    }

    return true;
  }
}
