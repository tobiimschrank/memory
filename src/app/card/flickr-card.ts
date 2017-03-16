import {ImageCard} from './image-card';

export class FlickrCard extends ImageCard {
  /**
   *
   * @param {number} key
   */
  constructor(key: number) {
    super(key);
    this.content = 'http://loremflickr.com/' + (100 + key) + '/100';

    this.preload();
  }
}
