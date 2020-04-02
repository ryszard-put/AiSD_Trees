class Controller {
  // HTML elements
  static INPUT_ID = '#bst_input';
  static INSERT_BTN_ID = '#bst_insert_btn';
  static INORDER_ID = '#bst_inorder';
  static PREORDER_ID = '#bst_preorder';
  static INORDER_BTN_ID = '#bst_print_inorder';
  static PREORDER_BTN_ID = '#bst_print_preorder';
  static MIN_PATH_ID = '#bst_min_path';
  static MAX_PATH_ID = '#bst_max_path';
  static MIN_BTN_ID = '#bst_min_btn';
  static MAX_BTN_ID = '#bst_max_btn';
  static ORIGINAL_SET_ID = '#original_set';
  static REMOVE_POSTSORDER_BTN_ID = '#bst_remove_postorder_btn';
  // static DRAW_BTN_ID = '#bst_draw_btn';
  static DSW_BTN_ID = '#bst_dsw_btn';
  static REMOVE_NODES_BTN_ID = '#bst_remove_nodes_btn';

  // Default values
  static MIN_DEFAULT = 'BST min value path: ';
  static MAX_DEFAULT = 'BST max value path: ';
  static INORDER_DEFAULT = 'BST in-order: ';
  static PREORDER_DEFAULT = 'BST pre-order: ';

  constructor(tree) {
    this.tree = tree;
    // Get control elements
    this.inputField = document.querySelector(Controller.INPUT_ID);
    this.insertValuesBtn = document.querySelector(Controller.INSERT_BTN_ID);
    this.inOrderContainer = document.querySelector(Controller.INORDER_ID);
    this.preOrderContainer = document.querySelector(Controller.PREORDER_ID);
    this.inOrderBtn = document.querySelector(Controller.INORDER_BTN_ID);
    this.preOrderBtn = document.querySelector(Controller.PREORDER_BTN_ID);
    this.minPathContainer = document.querySelector(Controller.MIN_PATH_ID);
    this.maxPathContainer = document.querySelector(Controller.MAX_PATH_ID);
    this.minPathBtn = document.querySelector(Controller.MIN_BTN_ID);
    this.maxPathBtn = document.querySelector(Controller.MAX_BTN_ID);
    this.originalSetContainer = document.querySelector(
      Controller.ORIGINAL_SET_ID
    );
    this.removePostOrderBtn = document.querySelector(
      Controller.REMOVE_POSTSORDER_BTN_ID
    );
    this.drawBtn = document.querySelector(Controller.DRAW_BTN_ID);
    this.dswBtn = document.querySelector(Controller.DSW_BTN_ID);
    this.removeNodesBtn = document.querySelector(
      Controller.REMOVE_NODES_BTN_ID
    );

    // Add events to control elements
    this.insertValuesBtn.addEventListener('click', e =>
      this.handleInsertion(e)
    );
    this.minPathBtn.addEventListener('click', e => this.findMinPath(e));
    this.maxPathBtn.addEventListener('click', e => this.findMaxPath(e));
    this.inOrderBtn.addEventListener('click', e => this.inOrder(e));
    this.preOrderBtn.addEventListener('click', e => this.preOrder(e));
    this.removePostOrderBtn.addEventListener('click', e =>
      this.removePostOrder(e)
    );
    // this.drawBtn.addEventListener('click', e => this.drawTreePreOrder(e));
    this.dswBtn.addEventListener('click', e => this.rebalanceTree(e));
    this.removeNodesBtn.addEventListener('click', e => this.removeNodes(e));
    // Share controller with tree
    this.tree.bindController(this);
  }
}

Controller.prototype.validateInput = function() {
  const { value } = this.inputField;
  let values = value
    .split(' ')
    .filter(el => !isNaN(el))
    .map(el => parseInt(el));
  return values;
};

Controller.prototype.handleInsertion = function(e) {
  e.preventDefault();
  const elements = this.validateInput();
  this.inputField.value = '';
  if (elements.length !== 0) {
    this.tree.originalSet.push(...elements);
    this.tree.insertValues(elements);
    this.originalSetContainer.textContent = JSON.stringify(
      this.tree.originalSet
    );
  }
};

Controller.prototype.removePostOrder = function(e) {
  e.preventDefault();
  this.tree.root = this.tree.removePostOrder();
  this.tree.originalSet = [];
  this.drawTreePreOrder();
};

Controller.prototype.resetMinPath = function() {
  this.tree.minPathArr = [];
  this.minPathContainer.textContent = Controller.MIN_DEFAULT;
};

Controller.prototype.findMinPath = function(e) {
  e.preventDefault();
  this.resetMinPath();
  this.tree.findMin();
  this.minPathContainer.textContent += this.tree.minPathArr.join('=>');
};

Controller.prototype.resetMaxPath = function() {
  this.tree.maxPathArr = [];
  this.maxPathContainer.textContent = Controller.MAX_DEFAULT;
};

Controller.prototype.findMaxPath = function(e) {
  e.preventDefault();
  this.resetMaxPath();
  this.tree.findMax();
  this.maxPathContainer.textContent += this.tree.maxPathArr.join('=>');
};

Controller.prototype.resetInOrder = function() {
  this.tree.inOrderArr = [];
  this.inOrderContainer.textContent = Controller.INORDER_DEFAULT;
};

Controller.prototype.inOrder = function(e) {
  e.preventDefault();
  this.resetInOrder();
  this.tree.inOrder();
  this.inOrderContainer.textContent += this.tree.inOrderArr.join(', ');
};

Controller.prototype.resetPreOrder = function() {
  this.tree.preOrderArr = [];
  this.preOrderContainer.textContent = Controller.PREORDER_DEFAULT;
};

Controller.prototype.preOrder = function(e) {
  e.preventDefault();
  this.resetPreOrder();
  this.tree.preOrder();
  this.preOrderContainer.textContent += this.tree.preOrderArr.join(', ');
};

Controller.prototype.drawTreePreOrder = function(e) {
  e?.preventDefault();
  background(36);
  if (this.tree.root) {
    this.tree.root.drawLines();
    this.tree.root.drawNode();
  }
};

Controller.prototype.rebalanceTree = function(e) {
  e?.preventDefault();
  this.tree.rebalanceDSW();
  this.drawTreePreOrder();
};

Controller.prototype.removeNodes = function(e) {
  e?.preventDefault();
  let input = prompt('Podaj wartości węzłów do usunięcia');
  if (!input) return alert('Brak węzłów');

  let values = input.split(' ').map(el => parseInt(el));

  values.forEach(value => {
    const nodeToRemove = this.tree.findNode(value);
    if (nodeToRemove) {
      this.tree.removeNode(nodeToRemove);
    } else return alert('Brak węzła o wartości: ' + value);
  });
};
