import {Injectable} from '@angular/core';

import {PlayerService} from "../player/player.service";
import {CardService} from "../card.service";
import {Card} from "../card";

@Injectable()
export class GameService {

  turns: number;
  flippedCards: Card[] = [];
  removedCards: Card[] = [];
  remainingTurns: number = 0;
  repeatOnPair: boolean = true;

  resolver: any;

  constructor(private cardService: CardService, private playerService: PlayerService) {
  }

  reset() {
    this.flippedCards = [];
    this.removedCards = [];
  }

  start(turns: number): Promise<boolean> {
    this.turns = turns;
    this.playerService.nextPlayer();

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
    if (this.checkForPairs()) {
      this.playerService.addPointsForCurrentPlayer();
      this.removeCurrentCardsFromField();

      this.playerService.addCardsToCurrentPlayer(this.flippedCards);
      if(!this.repeatOnPair) {
        this.playerService.nextPlayer();
      }
    } else {
      this.hideFlippedCards();
      this.playerService.nextPlayer();
    }

    if (this.cardService.countPairs() === this.removedCards.length / this.turns) {
      this.endGame();
      return;
    }

    this.startRound();
  }

  endGame() {
    this.resolver(true);
  }

  removeCurrentCardsFromField() {
    for (let i = this.flippedCards.length; i--;) {
      let currentCard: Card = this.flippedCards[i];

      currentCard.removed = true;
      this.removedCards.push(currentCard);
    }
  }

  checkForPairs(): boolean {
    let lastKey = null;

    for (let i = this.flippedCards.length; i--;) {
      if (lastKey === null) {
        lastKey = this.flippedCards[i].key;
        continue;
      }

      if (lastKey !== this.flippedCards[i].key) {
        return false;
      }
    }

    return true;
  }

  addFlippedCard(card: Card) {
    if (card.removed || card.flipped || this.remainingTurns === 0) {
      return;
    }

    this.flippedCards.push(card);
    card.flipped = true;

    this.remainingTurns--;

    if (this.remainingTurns === 0) {
      window.setTimeout(this.endRound.bind(this), 1000);
    }
  }

  hideFlippedCards() {
    for (let i = this.flippedCards.length; i--;) {
      this.flippedCards[i].flipped = false;
    }
  }
}
