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
    for(let c:number = this.cards.length;c--;) {
      this.cards[c].showAgain = true;
    }
  }

  hideCards(): void {
    for(let c:number = this.cards.length;c--;) {
      this.cards[c].showAgain = false;
    }
  }
}
