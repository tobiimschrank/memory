/* tslint:disable:no-unused-variable */
import {TestBed} from '@angular/core/testing';
import {PlayerService} from './player.service';
import {Player} from './player';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayerService]
    });

    service = TestBed.get(PlayerService);
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('should create a new player', () => {
    let player: Player = new Player();

    expect(service.createPlayer()).toEqual(player);
  });

  it('should create a new player with name "Gewinnertyp"', () => {
    let playerName: string = 'Gewinnertyp',
      player: Player = new Player(playerName);

    expect(service.createPlayer(playerName)).toEqual(player);
  });

  it('should create an empty list', () => {
    expect(service.getPlayers()).toEqual([]);
  });

  it('should create a list of 5 players', () => {
    for(let i = 5;i--;) {
      service.createPlayer();
    }

    expect(service.getPlayers().length).toEqual(5);
  });

  it('should return "Player 2"', () => {
    let player1: Player = service.createPlayer('Player 1'),
      player2: Player = service.createPlayer('Player 2');

    service.nextPlayer();

    expect(service.nextPlayer()).toEqual(player2);
  });

  it('should return "Player 1" after last player was reached', () => {
    let player1: Player = service.createPlayer('Player 1'),
      player2: Player = service.createPlayer('Player 2');

    service.nextPlayer();
    service.nextPlayer();

    expect(service.nextPlayer()).toEqual(player1);
  });

  it('should return "Player 1" as winner', () => {
    let player1: Player = service.createPlayer('Player 1'),
      player2: Player = service.createPlayer('Player 2'),
      player3: Player = service.createPlayer('Player 3');

    player1.points = 5;
    player2.points = 3;
    player3.points = 0;

    expect(service.getWinner()).toEqual(['Player 1']);
  });

  it('should return "Player 3" as winner', () => {
    let player1: Player = service.createPlayer('Player 1'),
      player2: Player = service.createPlayer('Player 2'),
      player3: Player = service.createPlayer('Player 3');

    player1.points = 3;
    player2.points = 5;
    player3.points = 6;

    expect(service.getWinner()).toEqual(['Player 3']);
  });

  it('should return "Player 1" and "Player 3" as winners', () => {
    let player1: Player = service.createPlayer('Player 1'),
      player2: Player = service.createPlayer('Player 2'),
      player3: Player = service.createPlayer('Player 3');

    player1.points = 6;
    player2.points = 2;
    player3.points = 6;

    expect(service.getWinner()).toEqual(['Player 1', 'Player 3']);
  });
});
