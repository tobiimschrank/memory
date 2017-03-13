export class Player {
  name: string = '';
  points: number = 0;
  isActive: boolean = false;

  constructor(name: string = '') {
    if(name === '') {
      name = 'Player';
    }

    this.name = name;
  }
}
