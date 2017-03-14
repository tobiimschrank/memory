import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {FieldComponent} from './field/field.component';

import {CardService} from './card.service';
import {PlayerModule} from './player/player.module';
import {GameModule} from './game/game.module';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent,
    CardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PlayerModule,
    GameModule
  ],
  providers: [
    CardService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
