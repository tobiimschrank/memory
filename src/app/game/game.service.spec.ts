/* tslint:disable:no-unused-variable */
import {TestBed} from '@angular/core/testing';
import {GameService} from './game.service';
import {CardService} from '../card/card.service';
import {PlayerService} from '../player/player.service';

describe('GameService', () => {
  let service: GameService,
    cardService: CardService,
    playerService: PlayerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameService, CardService, PlayerService]
    });

    service = TestBed.get(GameService);
    cardService = TestBed.get(CardService);
    playerService = TestBed.get(PlayerService);
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('should switch to the next player on start', () => {
    spyOn(playerService, 'nextPlayer');

    service.start(2);
    expect(playerService.nextPlayer).toHaveBeenCalled();
  });

  it('should let the CardService build a stack', () => {
    spyOn(cardService, 'buildCards');

    service.generateCards(2, 17, 'cage');
    expect(cardService.buildCards).toHaveBeenCalled();
  });
});
