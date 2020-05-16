import Snake from './Snake.js';

export default class MainScene extends Phaser.Scene {
  constructor() {
    super('MainScene');
  }

  create() {
    this.snake = new Snake(this);
  }

  update(time, delta) {
    this.snake.update(time);
  }
}
