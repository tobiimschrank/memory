import {Input} from "@angular/core";

export class Card {
  @Input()
  flipped: boolean = false;
  placed: boolean = false;
  removed: boolean = false;
  key: number;
  content: string;

  constructor(key: number) {
    this.key = key;
    this.content = key.toString();
  }

  reset() {
    this.flipped = false;
    this.placed = false;
    this.removed = false;
  }
}
