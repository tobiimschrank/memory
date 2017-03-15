import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {GameService} from './game.service';
import {PlayerModule} from '../player/player.module';
import {CardModule} from '../card/card.module';

@NgModule({
  imports: [
    CommonModule,
    PlayerModule,
    CardModule
  ],
  providers: [
    GameService,
  ],
  declarations: []
})
export class GameModule {
}
