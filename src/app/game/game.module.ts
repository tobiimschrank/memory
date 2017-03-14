import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GameService} from "./game.service";
import {PlayerModule} from "../player/player.module";

@NgModule({
  imports: [
    CommonModule,
    PlayerModule
  ],
  providers: [
    GameService,
  ],
  declarations: []
})
export class GameModule { }
