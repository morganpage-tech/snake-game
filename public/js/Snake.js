export default class Snake {
  constructor(scene) {
    this.scene = scene;
    this.lastMoveTime = 0;
    this.moveInterval = 100;
    this.tileSize = 16;
    this.direction = Phaser.Math.Vector2.LEFT;
    this.body = [];
    this.body.push(
      this.scene.add
        .rectangle(
          this.scene.game.config.width / 2,
          this.scene.game.config.height / 2,
          16,
          16,
          0xff0000
        )
        .setOrigin(0)
    );

    this.apple = this.scene.add.rectangle(64, 160, 16, 16, 0x00ff00).setOrigin(0);
    this.positionApple();
    scene.input.keyboard.on('keydown', e => {
      this.keydown(e);
    });
  }

  keydown(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 37: //left
        if (this.direction !== Phaser.Math.Vector2.RIGHT) this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 38: //up
        if (this.direction !== Phaser.Math.Vector2.DOWN) this.direction = Phaser.Math.Vector2.UP;
        break;
      case 39: //right
        if (this.direction !== Phaser.Math.Vector2.LEFT) this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 40: //down
        if (this.direction !== Phaser.Math.Vector2.UP) this.direction = Phaser.Math.Vector2.DOWN;
        break;
      case 65: //a
        this.add = true;
        break;
      case 32: //space
        this.stop = true;
        break;
    }
  }

  update(time) {
    if (this.stop === true) return;
    if (time >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time;
      this.move();
    }
  }

  positionApple() {
    this.apple.x =
      Math.floor((Math.random() * this.scene.game.config.width) / this.tileSize) * this.tileSize;
    this.apple.y =
      Math.floor((Math.random() * this.scene.game.config.height) / this.tileSize) * this.tileSize;
  }

  move() {
    let x = this.body[0].x + this.direction.x * 16;
    let y = this.body[0].y + this.direction.y * 16;

    if (this.apple.x === x && this.apple.y === y) {
      this.body.push(this.scene.add.rectangle(0, 0, 16, 16, 0xffffff).setOrigin(0));
      this.add = false;
      this.positionApple();
    }
    for (let index = this.body.length - 1; index > 0; index--) {
      this.body[index].x = this.body[index - 1].x;
      this.body[index].y = this.body[index - 1].y;
    }
    this.body[0].x = x;
    this.body[0].y = y;

    //Check for death : if off screen
    if (
      this.body[0].x < 0 ||
      this.body[0].x >= this.scene.game.config.width ||
      this.body[0].y < 0 ||
      this.body[0].y >= this.scene.game.config.height
    ) {
      this.scene.scene.restart();
    }
    //Check hit tail slice(begin,end)
    let bodyminushead = this.body.slice(1); //Remove head
    //Also some() will work
    if (bodyminushead.filter(b => b.x === this.body[0].x && b.y === this.body[0].y).length > 0) {
      this.scene.scene.restart();
    }
  }
}
