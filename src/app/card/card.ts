import {Input} from '@angular/core';

export class Card {
  @Input()
  flipped: boolean = false;
  placed: boolean = false;
  removed: boolean = false;
  showAgain: boolean = false;
  key: number;
  content: string;

  type: string = 'default';

  /**
   *
   * @param {number} key
   */
  constructor(key: number) {
    this.key = key;
    this.content = key.toString();
  }

  /**
   *
   */
  reset(): void {
    this.flipped = false;
    this.placed = false;
    this.removed = false;
  }
}
