import {ImageCard} from './image-card';

export class CageCard extends ImageCard {
  /**
   *
   * @param {number} key
   */
  constructor(key: number) {
    super(key);
    this.content = 'http://www.placecage.com/' + (100 + key) + '/100';

    this.preload();
  }
}
