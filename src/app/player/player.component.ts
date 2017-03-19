import {Component, OnInit, Input} from '@angular/core';
import {Player} from './player';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {
  @Input()
  player: Player;
  cardLayer: boolean = false;

  constructor() {
    if (this.player === null) throw new Error('Attribute \'player\' is required');
  }

  /**
   *
   */
  ngOnInit() {
  }

  /**
   *
   */
  showCardLayer(): void {
    this.cardLayer = true;
  }

  /**
   *
   */
  hideCardLayer(): void {
    this.cardLayer = false;
  }
}
