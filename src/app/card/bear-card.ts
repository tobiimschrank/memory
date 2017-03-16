import {ImageCard} from './image-card';

export class BearCard extends ImageCard {
  /**
   *
   * @param {number} key
   */
  constructor(key: number) {
    super(key);
    this.content = 'https://placebear.com/' + (100 + key) + '/100';

    this.preload();
  }
}
