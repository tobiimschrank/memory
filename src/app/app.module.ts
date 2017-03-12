import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { FieldComponent } from './field/field.component';

import {CardService} from './card.service';
import {GameService} from "./game.service";

@NgModule({
  declarations: [
    AppComponent,
    FieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    CardService,
    GameService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
