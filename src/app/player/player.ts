import {Card} from '../card/card';

export class Player {
  name: string = '';
  points: number = 0;
  isActive: boolean = false;

  cards: Card[] = [];

  /**
   *
   * @param {string} name
   */
  constructor(name: string = 'Player') {
    this.name = name;
  }

  /**
   *
   * @param card
   */
  addCard(card: Card): void {
    this.cards.push(card);
  }
}
