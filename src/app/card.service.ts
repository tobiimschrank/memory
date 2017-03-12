import {Injectable} from '@angular/core';
import {Card} from "./card";

@Injectable()
export class CardService {

  differentCards: number;
  cards: Card[] = [];

  constructor() {
  }

  /**
   *
   * @param {number} forPair
   * @param {number} count
   * @returns {Promise<Card[]>}
   */
  buildCards(forPair: number, count: number): Promise<Card[]> {
    this.differentCards = count / forPair;

    this.cleanup();

    for (let i: number = this.differentCards; i--;) {
      for (let p: number = forPair; p--;) {
        let newCard = new Card(i);
        this.cards.push(newCard);
      }
    }

    return Promise.resolve(this.cards);
  }

  cleanup() {
    for(let i: number = this.cards.length; i--;) {
      this.cards[i].reset();
    }

    this.cards = [];
  }

  /**
   *
   * @returns {number}
   */
  countPairs(): number {
    return this.differentCards;
  }

  /**
   *
   * @returns {Card}
   */
  getRandomCard(): Card {
    let random: number = Math.floor(Math.random() * this.cards.length);
    let card: Card = this.cards[random];

    if (card.placed) {
      return this.getRandomCard();
    }

    card.placed = true;
    return card;
  }
}
