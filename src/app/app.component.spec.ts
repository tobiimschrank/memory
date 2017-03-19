/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {CardModule} from './card/card.module';
import {PlayerModule} from './player/player.module';
import {GameModule} from './game/game.module';
import {FormsModule} from '@angular/forms';
import {FieldComponent} from './field/field.component';
import {By} from '@angular/platform-browser';
import {GameService} from './game/game.service';

describe('PlayerComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let gameService: GameService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        CardModule,
        PlayerModule,
        GameModule
      ],
      declarations: [
        AppComponent,
        FieldComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    gameService = TestBed.get(GameService);
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });

  it('should have 2 fieldsets', () => {
    const element = fixture.debugElement.queryAll(By.css('fieldset'));
    expect(element.length).toBe(2);
  });

  it('should have 2 players at the start', () => {
    const element = fixture.debugElement.queryAll(By.css('.player-name'));
    expect(element.length).toBe(2);
  });

  it('should have an add player button', () => {
    const element = fixture.debugElement.query(By.css('.add-player'));
    expect(element).not.toBeNull();
  });

  it('should not have the remove player button', () => {
    const element = fixture.debugElement.query(By.css('.remove-player'));
    expect(element).toBeNull();
  });

  it('should have the remove player button when more than two players exist', () => {
    component.addPlayer();
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.remove-player'));
    expect(element).not.toBeNull();
  });

  it('should hide the add player button when 9 or more players exist', () => {
    for (let i = 9; i--;) {
      component.addPlayer();
    }
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.add-player'));
    expect(element).toBeNull();
  });

  it('should show a layer when the game ended', () => {
    component.gameEnded = true;
    fixture.detectChanges();

    const element = fixture.debugElement.query(By.css('.layer'));
    expect(element).not.toBeNull();
  });

  it('should have two buttons in the layer', () => {
    component.gameEnded = true;
    fixture.detectChanges();

    const element = fixture.debugElement.queryAll(By.css('.layer button'));
    expect(element.length).toBe(2);
  });

  it('should reset the game, when "Neues Spiel" button is clicked (settings layer should be visible again)', () => {
    component.gameEnded = true;
    fixture.detectChanges();

    const button = fixture.debugElement.queryAll(By.css('.layer button'))[0];
    button.triggerEventHandler('click', null);

    const settings = fixture.debugElement.query(By.css('.settings'));
    expect(settings).not.toBeNull();
  });
});
