import {ImageCard} from './image-card';

export class UnsplashCard extends ImageCard {
  /**
   *
   * @param {number} key
   */
  constructor(key: number) {
    super(key);
    this.content = 'https://unsplash.it/100?image=' + key;

    this.preload();
  }
}
