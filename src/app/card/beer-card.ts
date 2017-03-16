import {ImageCard} from './image-card';

export class BeerCard extends ImageCard {
  /**
   *
   * @param {number} key
   */
  constructor(key: number) {
    super(key);
    this.content = 'http://beerhold.it/' + (100 + key) + '/100';

    this.preload();
  }
}
