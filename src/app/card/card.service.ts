import {Injectable} from '@angular/core';
import {Card} from './card';
import {CardFactory} from './card-factory';

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
   * @param {string} type
   * @returns {Card[]}
   */
  buildCards(forPair: number, count: number, type: string = 'number'): Card[] {
    this._differentCards = count / forPair;
    let cardFactory: CardFactory = new CardFactory();

    this._cleanup();

    for (let i: number = this._differentCards; i--;) {
      for (let p: number = forPair; p--;) {
        this._cards.push(cardFactory.generateCard(i, type));
      }
    }

    return this._cards;
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
