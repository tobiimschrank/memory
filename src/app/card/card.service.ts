import {Injectable} from '@angular/core';
import {Card} from './card';

@Injectable()
export class CardService {

  _differentCards: number;
  _cards: Card[] = [];

  /**
   *
   */
  constructor() {
  }

  /**
   *
   * @param {number} forPair
   * @param {number} count
   * @returns {Promise<Card[]>}
   */
  buildCards(forPair: number, count: number): Promise<Card[]> {
    this._differentCards = count / forPair;

    this._cleanup();

    for (let i: number = this._differentCards; i--;) {
      for (let p: number = forPair; p--;) {
        this._cards.push(new Card(i));
      }
    }

    return Promise.resolve(this._cards);
  }

  /**
   *
   * @private
   */
  _cleanup(): void {
    for (let card of this._cards) {
      card.reset();
    }

    this._cards = [];
  }

  /**
   *
   * @returns {number}
   */
  countPairs(): number {
    return this._differentCards;
  }

  /**
   *
   * @returns {Card}
   */
  getRandomCard(): Card {
    const random: number = Math.floor(Math.random() * this._cards.length);
    const card: Card = this._cards[random];

    if (card.placed) {
      return this.getRandomCard();
    }

    card.placed = true;
    return card;
  }
}
