class Node {
  constructor(value) {
    // Node implementation properties
    this.value = value;
    this.parent = null;
    this.left = null;
    this.right = null;

    // TODO: display properties
  }

  drawNode() {
    stroke(255);
    fill(40);
    ellipse(this.x, this.y, 40, 40);

    fill(255);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(20);
    text(
      this.bf !== undefined ? `${this.value}:${this.bf}` : this.value,
      this.x,
      this.y
    );
    if (this.left) {
      this.left.drawNode();
    }
    if (this.right) {
      this.right.drawNode();
    }
  }

  drawLines() {
    if (this.parent) {
      stroke(255);
      line(this.parent.x, this.parent.y, this.x, this.y);
    }
    if (this.left) {
      this.left.drawLines();
    }
    if (this.right) {
      this.right.drawLines();
    }
  }

  updateCoords(node = this) {
    node.level = node.parent.level + 1;
    node.y = node.parent.y + this.controller.tree.shiftY;
    if (node == node.parent.left) {
      node.x =
        node.parent.x -
        this.controller.tree.shiftX / Math.pow(2, node.level - 1);
    } else if (node == node.parent.right) {
      node.x =
        node.parent.x +
        this.controller.tree.shiftX / Math.pow(2, node.level - 1);
    }
    if (this.left) this.left.updateCoords();
    if (this.right) this.right.updateCoords();
  }
}
