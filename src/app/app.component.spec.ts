/* tslint:disable:no-unused-variable */
import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {PlayerModule} from './player/player.module';
import {FieldComponent} from './field/field.component';
import {CardModule} from './card/card.module';
import {GameModule} from './game/game.module';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        GameModule,
        PlayerModule,
        CardModule
      ],
      declarations: [
        AppComponent,
        FieldComponent
      ],
    });
    TestBed.compileComponents();
  }));

  describe('1st tests', () => {
    it('true is true', () => expect(true).toBe(true));
  });
});
