class Controller {
  // HTML elements
  static INPUT_ID = '#input';
  static INSERT_BTN_ID = '#insert_btn';
  static RANDOM_FILL_BTN_ID = '#random_fill_btn';
  static INORDER_ID = '#inorder';
  static PREORDER_ID = '#preorder';
  static INORDER_BTN_ID = '#print_inorder';
  static PREORDER_BTN_ID = '#print_preorder';
  static MIN_PATH_ID = '#min_path';
  static MAX_PATH_ID = '#max_path';
  static MIN_BTN_ID = '#min_btn';
  static MAX_BTN_ID = '#max_btn';
  static ORIGINAL_SET_ID = '#original_set';
  static REMOVE_POSTSORDER_BTN_ID = '#remove_postorder_btn';
  static DSW_BTN_ID = '#dsw_btn';
  static REMOVE_NODES_BTN_ID = '#remove_nodes_btn';

  // Performance buttons
  static TEST_INSERT_ID = '#test_insertion';
  static TEST_INORDER_ID = '#test_inorder';
  static TEST_MINSEARCH_ID = '#test_minsearch';
  static TEST_DSW_ID = '#test_dsw';

  // Default values
  static MIN_DEFAULT = 'BST min value path: ';
  static MAX_DEFAULT = 'BST max value path: ';
  static INORDER_DEFAULT = 'BST in-order: ';
  static PREORDER_DEFAULT = 'BST pre-order: ';

  constructor(tree, type) {
    this.tree = tree;
    this.type = type;

    this.visualize = true;
    // Get control elements
    this.inputField = document.querySelector(Controller.INPUT_ID);
    this.insertValuesBtn = document.querySelector(Controller.INSERT_BTN_ID);
    this.randomFillBtn = document.querySelector(Controller.RANDOM_FILL_BTN_ID);
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
    this.testInsertionBtn = document.querySelector(Controller.TEST_INSERT_ID);
    this.testInorderBtn = document.querySelector(Controller.TEST_INORDER_ID);
    this.testMinsearchBtn = document.querySelector(
      Controller.TEST_MINSEARCH_ID
    );
    this.testDSWBtn = document.querySelector(Controller.TEST_DSW_ID);

    // Add events to control elements
    this.insertValuesBtn.addEventListener('click', (e) =>
      this.handleInsertion(e)
    );
    this.randomFillBtn.addEventListener('click', (e) => this.randomFill(e));
    this.minPathBtn.addEventListener('click', (e) => this.findMinPath(e));
    this.maxPathBtn.addEventListener('click', (e) => this.findMaxPath(e));
    this.inOrderBtn.addEventListener('click', (e) => this.inOrder(e));
    this.preOrderBtn.addEventListener('click', (e) => this.preOrder(e));
    this.removePostOrderBtn.addEventListener('click', (e) =>
      this.removePostOrder(e)
    );
    // this.drawBtn.addEventListener('click', e => this.drawTreePreOrder(e));
    this.dswBtn.addEventListener('click', (e) => this.rebalanceTree(e));
    this.removeNodesBtn.addEventListener('click', (e) => this.removeNodes(e));

    this.testInsertionBtn.addEventListener('click', (e) =>
      this.testInsertion(e)
    );
    this.testInorderBtn.addEventListener('click', (e) => this.testInorder(e));
    this.testMinsearchBtn.addEventListener('click', (e) =>
      this.testMinSearch(e)
    );
    this.testDSWBtn.addEventListener('click', (e) => this.testRebalanceBST(e));
    // Share controller with tree
    this.tree.bindController(this);
  }
}

Controller.prototype.checkPerformance = function (methodName, ...rest) {
  if (this.visualize) return alert('Brak testów w trybie prezentacyjnym');
  console.log('Rozpoczęcie pomiaru czasu');
  let t0 = performance.now();
  this.tree[methodName](...rest);
  let t1 = performance.now();
  console.log('Zakończenie pomiaru czasu');
  console.log(`Wynik dla metody: ${methodName}: ${t1 - t0} ms`);
};

Controller.prototype.testInsertion = function (e) {
  e?.preventDefault();
  this.visualize = false;
  let amount = parseInt(prompt('Podaj liczbe elementów.'));
  if (amount > 0) {
    const set = this.generateSet(amount);
    this.checkPerformance('insertValues', set);
  }
  this.visualize = true;
};

Controller.prototype.testMinSearch = function (e) {
  e?.preventDefault();
  this.visualize = false;
  this.checkPerformance('findMin');
  this.visualize = true;
};

Controller.prototype.testInorder = function (e) {
  e?.preventDefault();
  this.visualize = false;
  this.checkPerformance('inOrderIterative');
  this.visualize = true;
};

Controller.prototype.testRebalanceBST = function (e) {
  e?.preventDefault();
  this.visualize = false;
  if (this.type === 'bst') this.checkPerformance('rebalanceDSW', set);
  else alert('Akcja dozwolona tylko dla BST');
  this.visualize = true;
};

Controller.prototype.validateInput = function () {
  const { value } = this.inputField;
  let values = value
    .split(' ')
    .filter((el) => !isNaN(el) && el)
    .map((el) => parseInt(el));
  return values;
};

Controller.prototype.handleInsertion = function (e) {
  e.preventDefault();
  const elements = this.validateInput();
  this.inputField.value = '';
  if (elements.length !== 0) {
    this.tree.originalSet.push(...elements);
    this.tree.insertValues(elements);
  } else alert('Błędne dane');
};

Controller.prototype.randomFill = function (e) {
  e?.preventDefault();
  let values = [];
  let max = 20,
    min = 1;
  for (let i = 0; i < 10; i++) {
    while (true) {
      let value = Math.floor(Math.random() * (max - min)) + min;
      if (values.indexOf(value) == -1) {
        values.push(value);
        break;
      }
    }
  }
  this.tree.insertValues(values);
};

Controller.prototype.generateSet = function (amount) {
  let set = [];
  for (let i = amount; i > 0; i--) {
    set.push(i);
  }
  return set;
};

Controller.prototype.removePostOrder = async function (e) {
  e?.preventDefault();
  if (!this.tree.root) return alert('Błąd, drzewo puste');
  this.tree.root = await this.tree.removePostOrder();
  this.tree.height = 0;
  this.drawTreePreOrder();
};

Controller.prototype.resetMinPath = function () {
  this.tree.minPathArr = [];
  this.minPathContainer.textContent = Controller.MIN_DEFAULT;
};

Controller.prototype.findMinPath = function (e) {
  e.preventDefault();
  this.resetMinPath();
  this.tree.findMin();
  this.minPathContainer.textContent += this.tree.minPathArr.join('=>');
};

Controller.prototype.resetMaxPath = function () {
  this.tree.maxPathArr = [];
  this.maxPathContainer.textContent = Controller.MAX_DEFAULT;
};

Controller.prototype.findMaxPath = function (e) {
  e.preventDefault();
  this.resetMaxPath();
  this.tree.findMax();
  this.maxPathContainer.textContent += this.tree.maxPathArr.join('=>');
};

Controller.prototype.resetInOrder = function () {
  this.tree.inOrderArr = [];
  this.inOrderContainer.textContent = Controller.INORDER_DEFAULT;
};

Controller.prototype.inOrder = function (e) {
  e.preventDefault();
  this.resetInOrder();
  this.tree.inOrderIterative();
  this.inOrderContainer.textContent += this.tree.inOrderArr.join(', ');
};

Controller.prototype.resetPreOrder = function () {
  this.tree.preOrderArr = [];
  this.preOrderContainer.textContent = Controller.PREORDER_DEFAULT;
};

Controller.prototype.preOrder = function (e) {
  e.preventDefault();
  this.resetPreOrder();
  this.tree.preOrder();
  this.preOrderContainer.textContent += this.tree.preOrderArr.join(', ');
};

Controller.prototype.drawTreePreOrder = async function (e) {
  e?.preventDefault();
  if (!this.visualize) return;
  background(36);
  if (this.tree.root) {
    this.tree.root.drawLines();
    this.tree.root.drawNode();
    await sleep(1000);
  }
};

Controller.prototype.rebalanceTree = function (e) {
  e?.preventDefault();
  this.tree.rebalanceDSW();
  this.drawTreePreOrder();
};

Controller.prototype.removeNodes = async function (e) {
  e?.preventDefault();
  if (!this.tree.root) return alert('Błąd, drzewo puste');
  let input = prompt('Podaj wartości węzłów do usunięcia');
  if (!input) return alert('Brak węzłów');

  let values = input.split(' ').map((el) => parseInt(el));

  for (value of values) {
    const nodeToRemove = this.tree.findNode(value);
    if (nodeToRemove) {
      this.tree.removeNode(nodeToRemove);
      await this.drawTreePreOrder();
    } else alert('Brak węzła o wartości: ' + value);
  }
};
