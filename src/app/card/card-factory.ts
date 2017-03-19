import {Card} from './card';
import {BeerCard} from './beer-card';
import {FlickrCard} from './flickr-card';
import {CageCard} from './cage-card';
import {UnsplashCard} from './unsplash-card';

export class CardFactory {
  /**
   *
   * @param {number} key
   * @param {string} type
   * @returns {Card}
   */
  generateCard(key: number, type: string = 'number'): Card {
    switch (type) {
      case 'beer':
        return new BeerCard(key);
      case 'unsplash':
        return new UnsplashCard(key);
      case 'flickr':
        return new FlickrCard(key);
      case 'cage':
        return new CageCard(key);
      default:
        return new Card(key);
    }
  }
}
