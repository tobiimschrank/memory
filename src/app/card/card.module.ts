import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {CardService} from './card.service';
import {CardComponent} from './card.component';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    CardService,
  ],
  declarations: [
    CardComponent
  ],
  exports: [
    CardComponent
  ]
})
export class CardModule {
}
