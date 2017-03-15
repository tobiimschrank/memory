import {Card} from '../card';

export class Player {
  name: string = '';
  points: number = 0;
  isActive: boolean = false;

  cards: Card[] = [];

  constructor(name: string = 'Player') {
    this.name = name;
  }

  addCard(card: Card): void {
    this.cards.push(card);
  }

  showCards(): void {
    for(let card of this.cards) {
      card.showAgain = true;
    }
  }

  hideCards(): void {
    for(let card of this.cards) {
      card.showAgain = false;
    }
  }
}
