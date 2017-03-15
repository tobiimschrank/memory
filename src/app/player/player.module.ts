import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PlayerService} from './player.service';
import {PlayerComponent} from './player.component';
import {CardModule} from '../card/card.module';

@NgModule({
  imports: [
    CommonModule,
    CardModule
  ],
  providers: [
    PlayerService
  ],
  declarations: [
    PlayerComponent
  ],
  exports: [
    PlayerComponent
  ]
})
export class PlayerModule {
}
