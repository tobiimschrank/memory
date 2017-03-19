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
   * @param {CardService} _cardService
   * @param {PlayerService} _playerService
   */
  constructor(private _cardService: CardService, private _playerService: PlayerService) {
  }

  /**
   *
   */
  reset() {
    this._flippedCards = [];
    this._removedCards = [];
    this._remainingTurns = 0;
  }

  /**
   * starts the game
   *
   * @param {number} turns
   * @returns {Promise<boolean>}
   */
  start(turns: number): Promise<boolean> {
    this._turns = turns;
    this._playerService.nextPlayer();

    this._startRound();

    return new Promise(function (resolve) {
      this._resolver = resolve;
    }.bind(this));
  }

  /**
   * if pair was found the cards will be removed
   */
  removeCurrentCardsFromField(): void {
    for (let flippedCard of this._flippedCards) {
      flippedCard.removed = true;
      this._removedCards.push(flippedCard);
    }
  }

  /**
   * user flipped a card, so it has to be flipped on field and be saved for use at end of turn
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
   * return the cards, that were flipped in the last turn
   */
  hideFlippedCards(): void {
    for (let flippedCard of this._flippedCards) {
      flippedCard.flipped = false;
    }
  }

  /**
   * generate a stack of cards to play with
   *
   * @param {number} perPair
   * @param {number} differentCards
   * @param {string} type
   */
  generateCards(perPair: number, differentCards: number, type: string = 'number'): void {
    this._cardService.buildCards(perPair, differentCards, type);
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
   * end the current turn and check for points for the current player or the end of the game
   *
   * @private
   */
  _endRound(): void {
    if (this._checkForPairs()) {
      this._playerService.addPointsForCurrentPlayer();
      this.removeCurrentCardsFromField();

      this._playerService.addCardsToCurrentPlayer(this._flippedCards);
      if (!this._repeatOnPair) {
        this._playerService.nextPlayer();
      }
    } else {
      this.hideFlippedCards();
      this._playerService.nextPlayer();
    }

    if (this._cardService.countPairs() === this._removedCards.length / this._turns) {
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
