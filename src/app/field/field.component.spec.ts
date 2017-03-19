/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FieldComponent} from './field.component';
import {CardModule} from '../card/card.module';
import {AppModule} from '../app.module';
import {CardService} from '../card/card.service';
import {By} from '@angular/platform-browser';
import {Card} from '../card/card';
import {GameService} from '../game/game.service';
import {PlayerService} from '../player/player.service';

describe('FieldComponent', () => {
  let component: FieldComponent;
  let fixture: ComponentFixture<FieldComponent>;
  let cardService: CardService;
  let gameService: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CardModule
      ],
      declarations: [FieldComponent],
      providers: [CardService, GameService, PlayerService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    cardService = TestBed.get(CardService);
    gameService = TestBed.get(GameService);
    fixture = TestBed.createComponent(FieldComponent);
    component = fixture.componentInstance;

    component.rows = 2;
    component.columns = 2;

    cardService.buildCards(1, 4);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });

  it('should have 2 rows', () => {
    const element = fixture.debugElement.queryAll(By.css('.row'));
    expect(element.length).toBe(2);
  });

  it('should have 4 cells / cards', () => {
    const element = fixture.debugElement.queryAll(By.css('.cell'));
    expect(element.length).toBe(4);
  });

  it('should flip a card', () => {
    const cards: Card[] = cardService._cards;

    spyOn(gameService, 'addFlippedCard');

    component.flipCard(cards[2]);

    expect(gameService.addFlippedCard).toHaveBeenCalled();
  });
});
