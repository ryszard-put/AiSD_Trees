class BST {
  constructor() {
    this.root = null;
    this.height = null;
    this.controller = null;
    this.originalSet = [];
    this.minPathArr = [];
    this.maxPathArr = [];
    this.inOrderArr = [];
    this.preOrderArr = [];

    // drawing stuff
    this.x = CANVASWIDTH / 2;
    this.y = 50;
    this.shiftX = 200;
    this.shiftY = 80;
  }

  bindController(controller) {
    this.controller = controller;
  }
}

BST.prototype.insertValue = function(value) {
  let node = new Node(value);
  node.controller = this.controller;
  let p = this.root;
  if (!p) {
    this.root = node;
    this.root.x = this.x;
    this.root.y = this.y;
    this.root.level = 0;
    this.height = 0;
  } else {
    let counter = 0;
    while (true) {
      counter++;
      if (value < p.value) {
        if (!p.left) {
          p.left = node;
          break;
        } else {
          p = p.left;
        }
      } else {
        if (!p.right) {
          p.right = node;
          break;
        } else {
          p = p.right;
        }
      }
    }
    this.height = counter > this.height ? counter : this.height;
    node.parent = p;
    node.level = node.parent.level + 1;
    if (this.controller.visualize) {
      node.y = node.parent.y + this.shiftY;
      if (node == node.parent.left) {
        node.x = node.parent.x - this.shiftX / Math.pow(2, node.level - 1);
      } else if (node == node.parent.right) {
        node.x = node.parent.x + this.shiftX / Math.pow(2, node.level - 1);
      }
    }
  }
};

BST.prototype.insertValues = function(elements) {
  elements.forEach(el => {
    if (!this.findNode(el)) this.insertValue(el);
  });
  this.updateCoords();
  this.controller.drawTreePreOrder();
};

BST.prototype.findNode = function(value) {
  let p = this.root;
  while (p && p.value !== value) {
    if (value < p.value) p = p.left;
    else p = p.right;
  }
  return p;
};

BST.prototype.findMin = function() {
  let p = this.root;
  while (p) {
    this.minPathArr.push(p.value);
    p = p.left;
  }
};

BST.prototype.findMax = function() {
  let p = this.root;
  while (p) {
    this.maxPathArr.push(p.value);
    p = p.right;
  }
};

BST.prototype.inOrder = function(node = this.root) {
  if (!node) return;
  this.inOrder(node.left);
  this.inOrderArr.push(node.value);
  this.inOrder(node.right);
};

BST.prototype.inOrderIterative = function() {
  let node = this.root,
    stack = [];
  while (node || stack.length) {
    while (node) {
      stack.push(node);
      node = node.left;
    }

    node = stack.pop();
    this.inOrderArr.push(node.value);
    node = node.right;
  }
};

BST.prototype.preOrder = function(node = this.root) {
  if (!node) return;
  this.preOrderArr.push(node.value);
  this.preOrder(node.left);
  this.preOrder(node.right);
};

BST.prototype.minHelper = function(node) {
  if (node) {
    while (node.left) {
      node = node.left;
    }
  }
  return node;
};

BST.prototype.maxHelper = function(node) {
  if (node) {
    while (node.right) {
      node = node.right;
    }
  }
  return node;
};

BST.prototype.findSuccessor = function(node) {
  let r;
  if (node) {
    if (node.right) return this.minHelper(node.right);
    else {
      r = node.parent;
      while (r && node == r.right) {
        node = r;
        r = r.parent;
      }
      return r;
    }
  }
  return node;
};

BST.prototype.findPredecessor = function(node) {
  let r;
  if (node) {
    if (node.left) return this.maxHelper(node.left);
    else {
      r = node.parent;
      while (r && node == r.left) {
        node = r;
        r = r.parent;
      }
      return r;
    }
  }
  return node;
};

BST.prototype.removeNode = function(node) {
  let Y, Z;
  if (node) {
    Y = !node.left || !node.right ? node : this.findSuccessor(node);

    Z = Y.left || Y.right;

    if (Z) Z.parent = Y.parent;

    if (!Y.parent) this.root = Z;
    else if (Y == Y.parent.left) Y.parent.left = Z;
    else Y.parent.right = Z;

    if (Y != node) node.value = Y.value;
    Y = null;
    this.updateCoords();
    this.updateHeight();
  }
};

BST.prototype.removePostOrder = async function(node = this.root) {
  if (node.left) node.left = await this.removePostOrder(node.left);
  if (node.right) node.right = await this.removePostOrder(node.right);
  await this.controller.drawTreePreOrder();
  return null;
};

BST.prototype.removeByValue = function(value) {
  this.removeNode(this.findNode(value));
};

BST.prototype.log2 = function(x) {
  let y = 1;
  while ((x >>= 1) > 0) y <<= 1;

  return y;
};

BST.prototype.rotL = function(A) {
  let B = A.right,
    p = A.parent;
  if (B) {
    A.right = B.left;
    if (A.right) A.right.parent = A;

    B.left = A;
    B.parent = p;
    A.parent = B;

    if (p) {
      if (p.left == A) p.left = B;
      else p.right = B;
    } else this.root = B;
  }
};

BST.prototype.rotR = function(A) {
  let B = A.left,
    p = A.parent;
  if (B) {
    A.left = B.right;
    if (A.left) A.left.parent = A;

    B.right = A;
    B.parent = p;
    A.parent = B;

    if (p) {
      if (p.left == A) p.left = B;
      else p.right = B;
    } else this.root = B;
  }
};

BST.prototype.updateHeight = function() {
  this.height = 0;
  this.newHeight();
};

BST.prototype.newHeight = function(node = this.root, counter = 0) {
  if (!node) {
    this.height = null;
    return;
  }
  if (node.left) this.newHeight(node.left, counter + 1);
  if (node.right) this.newHeight(node.right, counter + 1);
  if (counter > this.height) this.height = counter;
};

BST.prototype.rebalanceDSW = function() {
  let n = 0;
  let p = this.root;
  while (p) {
    if (p.left) {
      this.rotR(p);
      p = p.parent;
    } else {
      n++;
      p = p.right;
    }
  }
  let s = n + 1 - 2 ** Math.floor(Math.log2(n + 1));
  p = this.root;
  for (let i = 1; i <= s; i++) {
    this.rotL(p);
    p = p.parent.right;
  }
  n -= s;
  while (n > 1) {
    n = n >> 1;
    p = this.root;
    for (let i = 1; i <= n; i++) {
      this.rotL(p);
      p = p.parent.right;
    }
  }
  this.updateCoords();
  //this.updateHeight();
};

BST.prototype.updateCoords = function() {
  if (!this.controller.visualize) return;
  if (this.root) {
    this.root.x = this.x;
    this.root.y = this.y;
    this.root.level = 0;
    if (this.root.left) this.root.left.updateCoords();
    if (this.root.right) this.root.right.updateCoords();
  }
};
