export default class Snake {
  constructor(scene, x, y) {
    this.scene = scene;
    this.lastMoveTime = 0;
    this.moveInterval = 1000;
    this.direction = Phaser.Math.Vector2.RIGHT;
    this.x = 100;
    this.y = 100;
    this.body = [];
    this.bodypos = [];
    this.body.push(this.scene.add.rectangle(this.x, this.y, 16, 16, 0xff0000).setOrigin(0));
    this.body.push(this.scene.add.rectangle(this.x, this.y, 16, 16, 0x0000ff).setOrigin(0));
    console.log(this.body);
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
    if (time.now >= this.lastMoveTime + this.moveInterval) {
      this.lastMoveTime = time.now;
      this.move();
    }
  }

  move() {
    if (this.add) {
      this.body.push(this.scene.add.rectangle(this.x, this.y, 16, 16, 0xffffff).setOrigin(0));
      this.add = false;
    }
    this.bodypos.unshift({
      x: this.body[0].x + this.direction.x * 16,
      y: this.body[0].y + this.direction.y * 16
    });
    this.bodypos = this.bodypos.slice(0, this.body.length);
    console.log(JSON.stringify(this.bodypos));
    for (let index = 0; index < this.body.length; index++) {
      this.body[index].x = this.bodypos[index] && this.bodypos[index].x;
      this.body[index].y = this.bodypos[index] && this.bodypos[index].y;
    }

    // this.body[1].x = this.body[0].x;
    // this.body[1].y = this.body[0].y;
    // this.body[0].x += this.direction.x * 16;
    // this.body[0].y += this.direction.y * 16;
  }
}
