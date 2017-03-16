import {Card} from './card';

export class ImageCard extends Card {
  type: string = 'image';

  constructor(key: number) {
    super(key);
  }

  preload() {
    let tmpImg: HTMLImageElement; // will be used to load the actual image before showing it

    // background loading logic
    if (tmpImg) {
      tmpImg.onload = null; // remove the previous onload event, if registered
    }
    tmpImg = new Image();
    tmpImg.src = this.content;
  }
}
