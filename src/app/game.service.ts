import { Injectable } from '@angular/core';

import {Card} from './card';
import {CardService} from "./card.service";

@Injectable()
export class GameService {

  turns: number;
  flippedCards: Card[] = [];
  removedCards: Card[] = [];
  cardService: CardService;
  remainingTurns: number = 0;

  resolver: any;

  constructor() { }

  reset() {
    this.flippedCards = [];
    this.removedCards = [];
  }

  start(turns: number, cardService: CardService): Promise<boolean> {
    this.cardService = cardService;
    this.turns = turns;
    this.startRound();

    return new Promise(function (resolve) {
      this.resolver = resolve;
    }.bind(this));
  }

  startRound() {
    this.flippedCards = [];
    this.remainingTurns = this.turns;
  }

  endRound() {
    if(this.checkForPairs()) {
      alert('Du hast ein Pärchen!');
      this.removeCurrentCardsFromField();
    } else {
      this.hideFlippedCards();
    }

    if(this.cardService.countPairs() == this.removedCards.length / this.turns) {
      this.endGame();
      return;
    }

    this.startRound();
  }

  endGame() {
    this.resolver(true);
  }

  removeCurrentCardsFromField() {
    for(let i = this.flippedCards.length; i--;) {
      let currentCard: Card = this.flippedCards[i];

      currentCard.removed = true;
      this.removedCards.push(currentCard);
    }
  }

  checkForPairs(): boolean {
    let lastKey = null;

    for(let i = this.flippedCards.length; i--;) {
      if(lastKey == null) {
        lastKey = this.flippedCards[i].key;
        continue;
      }

      if(lastKey !== this.flippedCards[i].key) {
        return false;
      }
    }

    return true;
  }

  addFlippedCard(card: Card) {
    if(card.removed || card.flipped || this.remainingTurns == 0) {
      return;
    }

    this.flippedCards.push(card);
    card.flipped = true;

    this.remainingTurns--;

    if(this.remainingTurns == 0) {
      window.setTimeout(this.endRound.bind(this), 2000);
    }
  }

  hideFlippedCards() {
    for(let i = this.flippedCards.length; i--;) {
      this.flippedCards[i].flipped = false;
    }
  }
}
