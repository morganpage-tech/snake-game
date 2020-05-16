export default class Snake {
  constructor(scene, x, y) {
    this.scene = scene;
    this.lastMoveTime = 0;
    this.moveInterval = 2000;
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.x = 100;
    this.y = 100;
    this.body = scene.add.group();
    this.body.add(scene.add.rectangle(this.x, this.y, 16, 16, 0x0000ff).setOrigin(0));
    this.body.add(scene.add.rectangle(this.x, this.y, 16, 16, 0x0000ff).setOrigin(0));
    scene.input.keyboard.on('keydown', e => {
      this.keydown(e);
    });
  }

  keydown(event) {
    console.log(event.keyCode);
    switch (event.keyCode) {
      case 37: //left
        this.direction = Phaser.Math.Vector2.LEFT;
        break;
      case 38: //up
        this.direction = Phaser.Math.Vector2.UP;
        break;
      case 39: //right
        this.direction = Phaser.Math.Vector2.RIGHT;
        break;
      case 40: //down
        this.direction = Phaser.Math.Vector2.DOWN;
        break;
      case 65: //add
        this.add();
        break;
    }
  }

  add() {
    this.body.add(this.scene.add.rectangle(this.x, this.y, 16, 16, 0xffffff).setOrigin(0));
  }

  update(time) {
    if (time.now >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time.now;
      this.move();
    }
  }

  move() {
    this.x = Phaser.Math.Wrap(this.x + this.direction.x * 16, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Wrap(this.y + this.direction.y * 16, 0, this.scene.game.config.height);
    Phaser.Actions.ShiftPosition(this.body.getChildren(), this.x, this.y, 1);
  }
}
