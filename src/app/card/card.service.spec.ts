/* tslint:disable:no-unused-variable */
import {TestBed} from '@angular/core/testing';
import {CardService} from './card.service';
import {Card} from './card';

describe('CardService', () => {
  let service: CardService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardService]
    });

    service = TestBed.get(CardService);
  });

  it('should create an instance', () => {
    expect(service).toBeDefined();
  });

  it('should create 16 cards', () => {
    expect(service.buildCards(2, 16).length).toEqual(16);
  });

  it('should create 33 cards', () => {
    expect(service.buildCards(3, 33).length).toEqual(33);
  });

  it('should have created 4 pairs', () => {
    service.buildCards(5, 20);
    expect(service.countPairs()).toEqual(4);
  });

  it('should place card', () => {
    service.buildCards(1, 1);

    expect(service.getRandomCard().placed).toBeTruthy();
  });

  it('should return card', () => {
    service.buildCards(1, 1);
    let dummyCard = new Card(0);
    dummyCard.placed = true;

    expect(service.getRandomCard()).toEqual(dummyCard);
  });
});
