class AVL extends BST {
  constructor() {
    super();
  }
}

AVL.prototype.rotRR = function (A) {
  let B = A.right,
    p = A.parent;

  A.right = B.left;
  if (A.right) A.right.parent = A;

  B.left = A;
  B.parent = p;
  A.parent = B;

  if (p) {
    if (p.left == A) p.left = B;
    else p.right = B;
  } else this.root = B;

  if (B.bf == -1) A.bf = B.bf = 0;
  else {
    A.bf = -1;
    B.bf = 1;
  }
};

AVL.prototype.rotLL = function (A) {
  let B = A.left,
    p = A.parent;

  A.left = B.right;
  if (A.left) A.left.parent = A;

  B.right = A;
  B.parent = p;
  A.parent = B;

  if (p) {
    if (p.left == A) p.left = B;
    else p.right = B;
  } else this.root = B;

  if (B.bf == 1) A.bf = B.bf = 0;
  else {
    A.bf = 1;
    B.bf = -1;
  }
};

AVL.prototype.rotRL = function (A) {
  let B = A.right,
    C = B.left,
    p = A.parent;

  B.left = C.right;
  if (B.left) B.left.parent = B;

  A.right = C.left;
  if (A.right) A.right.parent = A;

  C.left = A;
  C.right = B;
  A.parent = B.parent = C;
  C.parent = p;

  if (p) {
    if (p.left == A) p.left = C;
    else p.right = C;
  } else this.root = C;

  if (C.bf == -1) A.bf = 1;
  else A.bf = 0;
  if (C.bf == 1) B.bf = -1;
  else B.bf = 0;

  C.bf = 0;
};

AVL.prototype.rotLR = function (A) {
  let B = A.left,
    C = B.right,
    p = A.parent;

  B.right = C.left;
  if (B.right) B.right.parent = B;

  A.left = C.right;
  if (A.left) A.left.parent = A;

  C.right = A;
  C.left = B;
  A.parent = B.parent = C;
  C.parent = p;

  if (p) {
    if (p.left == A) p.left = C;
    else p.right = C;
  } else this.root = C;

  if (C.bf == 1) A.bf = -1;
  else A.bf = 0;
  if (C.bf == -1) B.bf = 1;
  else B.bf = 0;

  C.bf = 0;
};

AVL.prototype.insertValue = function (value) {
  let r,
    t,
    newNode = new Node(value);
  newNode.bf = 0;
  newNode.controller = this.controller;
  // Faza 1 - wstawianie tak jak w BST
  let p = this.root;
  if (!p) {
    this.root = newNode;
    this.root.x = this.x;
    this.root.y = this.y;
    this.root.level = 0;
    this.height = 0;
  } else {
    while (true) {
      if (value < p.value) {
        if (!p.left) {
          p.left = newNode;
          break;
        }
        p = p.left;
      } else {
        if (!p.right) {
          p.right = newNode;
          break;
        }
        p = p.right;
      }
    }
    newNode.parent = p;
    // newNode.level = newNode.parent.level + 1;
    // newNode.y = newNode.parent.y + this.shiftY;
    // if (newNode == newNode.parent.left) {
    //   newNode.x =
    //     newNode.parent.x - this.shiftX / Math.pow(2, newNode.level - 1);
    // } else if (newNode == newNode.parent.right) {
    //   newNode.x =
    //     newNode.parent.x + this.shiftX / Math.pow(2, newNode.level - 1);
    // }

    // FAZA 2 - równoważenie drzewa
    if (p.bf) p.bf = 0;
    else {
      if (p.left == newNode) p.bf = 1;
      else p.bf = -1;

      r = p.parent;

      t = false;
      while (r) {
        if (r.bf) {
          t = true;
          break;
        }

        if (r.left == p) r.bf = 1;
        else r.bf = -1;

        p = r;
        r = r.parent;
      }

      if (t) {
        if (r.bf == 1) {
          if (r.right == p) r.bf = 0;
          else if (p.bf == -1) this.rotLR(r);
          else this.rotLL(r);
        } else {
          if (r.left == p) r.bf = 0;
          else if (p.bf == 1) this.rotRL(r);
          else this.rotRR(r);
        }
      }
    }
    this.updateHeight();
  }
};

AVL.prototype.removeNode = function (node) {
  let t, y, z, nest;
  if (node.left && node.right) {
    y = this.removeNode(this.findPredecessor(node));
    nest = false;
  } else {
    if (node.left) {
      y = node.left;
      node.left = null;
    } else {
      y = node.right;
      node.right = null;
    }
    node.bf = 0;
    nest = true;
  }

  if (y) {
    y.parent = node.parent;
    y.left = node.left;
    if (y.left) y.left.parent = y;
    y.right = node.right;
    if (y.right) y.right.parent = y;
    y.bf = node.bf;
  }

  if (node.parent) {
    if (node.parent.left == node) node.parent.left = y;
    else node.parent.right = y;
  } else this.root = y;

  if (nest) {
    z = y;
    y = node.parent;
    while (y) {
      if (!y.bf) {
        // Przypadek nr 1
        if (y.left == z) y.bf = -1;
        else y.bf = 1;
        break;
      } else {
        if ((y.bf == 1 && y.left == z) || (y.bf == -1 && y.right == z)) {
          // Przypadek nr 2
          y.bf = 0;
          z = y;
          y = y.parent;
        } else {
          if (y.left == z) t = y.right;
          else t = y.left;
          if (!t.bf) {
            // Przypadek 3A
            if (y.bf == 1) this.rorLL(y);
            else this.rotRR(y);
            break;
          } else if (y.bf == t.bf) {
            // Przypadek 3B
            if (y.bf == 1) this.rotLL(y);
            else this.rotRR(y);
            z = t;
            y = t.parent;
          } else {
            // Przypadek 3C
            if (y.bf == 1) this.rotLR(y);
            else this.rotRL(y);
            z = y.parent;
            y = z.parent;
          }
        }
      }
    }
  }
  this.updateCoords();
  return node;
};
