import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PlayerService} from './player.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    PlayerService
  ],
  declarations: []
})
export class PlayerModule { }
