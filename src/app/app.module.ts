import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {FieldComponent} from './field/field.component';
import {PlayerModule} from './player/player.module';
import {GameModule} from './game/game.module';
import {CardModule} from './card/card.module';

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    PlayerModule,
    GameModule,
    CardModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
