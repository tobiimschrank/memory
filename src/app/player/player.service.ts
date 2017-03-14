import {Injectable} from '@angular/core';
import {Player} from './player';
import {Card} from '../card';

@Injectable()
export class PlayerService {
  private players: Player[] = [];
  private currentPlayerIndex: number = -1;
  private currentPlayer: Player;

  public createPlayer(name: string = ''): Player {
    let newPlayer: Player = new Player(name);
    this.players.push(newPlayer);

    return newPlayer;
  }

  public getPlayers(): Player[] {
    return this.players;
  }

  public addPointsForCurrentPlayer(pointsToAdd: number = 1): void {
    this.currentPlayer.points += pointsToAdd;
  }

  public nextPlayer(): Player {
    if (this.currentPlayer) {
      this.currentPlayer.isActive = false;
    }

    this.currentPlayerIndex++;
    if (this.currentPlayerIndex >= this.players.length) {
      this.currentPlayerIndex = 0;
    }

    this.currentPlayer = this.players[this.currentPlayerIndex];
    this.currentPlayer.isActive = true;

    return this.currentPlayer;
  }

  public resetPlayers(hard: boolean = false): void {
    if (hard) {
      this.players = [];
    } else {
      for (let p: number = this.players.length; p--;) {
        this.players[p].points = 0;
      }
    }
    this.currentPlayerIndex = -1;
    this.currentPlayer = null;
  }

  public getWinner(): Player[] {
    let winners: Player[] = [],
      sortedPlayers: Player[] = this.players.sort(this.compare),
      highestPoints = 0;

    for (let s = 0; s < sortedPlayers.length; s++) {
      let currentPlayer: Player = sortedPlayers[s];
      if(currentPlayer.points > highestPoints) {
        highestPoints = currentPlayer.points;
      }

      if(currentPlayer.points < highestPoints) {
        break;
      }

      winners.push(currentPlayer);
    }

    return winners;
  }

  public addCardsToCurrentPlayer(cards: Card[]) {
    for(let card of cards) {
      this.currentPlayer.addCard(card);
    }
  }

  private compare(a: Player, b: Player): number {
    if (a.points < b.points) {
      return 1;
    }
    if (a.points > b.points) {
      return -1;
    }
    return 0;
  }
}
