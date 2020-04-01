const ButtonBST = document.querySelector('#bst_button');
const InputBST = document.querySelector('#bst_input');
const DrawBST = document.querySelector('#bst_draw');
const PrintInOrderBST = document.querySelector('#bst_print_inorder');
const InOrderContainerBST = document.querySelector('#bst_inorder');
const PostOrderContainerBST = document.querySelector('#bst_postorder');
const MinPathContainerBST = document.querySelector('#bst_minpath');
const MaxPathContainerBST = document.querySelector('#bst_maxpath');
const MinSerchBST = document.querySelector('#bst_min_search');
const MaxSerchBST = document.querySelector('#bst_max_search');

InOrderContainerBST.resetValue = function() {
  this.textContent = 'BST in-order: ';
};

PostOrderContainerBST.resetValue = function() {
  this.textContent = 'BST post-order: ';
};

MinPathContainerBST.resetValue = function() {
  this.textContent = 'BST min value path: ';
};

MaxPathContainerBST.resetValue = function() {
  this.textContent = 'BST max value path: ';
};

let BST;

class NodeBST {
  constructor(value) {
    this.value = value;
    this.level = 0;
    this.height = 0;
    this.parent = null;
    this.left = null;
    this.right = null;
  }
}

NodeBST.prototype.insertValue = function(value) {
  let cNode = this;
  while (true) {
    if (value < cNode.value) {
      if (!cNode.left) {
        cNode.left = new NodeBST(value);
        cNode.left.level = cNode.level + 1;
        this.height++;
        cNode.left.parent = cNode;
        break;
      } else cNode = cNode.left;
    } else {
      if (!cNode.right) {
        cNode.right = new NodeBST(value);
        cNode.right.level = cNode.level + 1;
        this.height++;
        cNode.right.parent = cNode;
        break;
      } else cNode = cNode.right;
    }
  }
};

NodeBST.prototype.searchMin = function(path = []) {
  path.push(this.value);
  if (!this.left) {
    return path;
  }
  return this.left.searchMin(path);
};

NodeBST.prototype.searchMax = function(path = []) {
  path.push(this.value);
  if (!this.right) {
    return path;
  }
  return this.right.searchMax(path);
};

NodeBST.prototype.inOrder = function(cNode = this) {
  if (cNode) {
    this.inOrder(cNode.left);
    InOrderContainerBST.textContent += `${cNode.value} `;
    this.inOrder(cNode.right);
  }
};

NodeBST.prototype.postOrder = function(cNode = this) {
  if (cNode) {
    this.postOrder(cNode.left);
    this.postOrder(cNode.right);
    PostOrderContainerBST.textContent += `${cNode.value} `;
  }
};

const generateBST = values => {
  const BST = new NodeBST(values[0]); // korzeń drzewa
  values.forEach((value, idx) => {
    if (idx !== 0) {
      BST.insertValue(value);
    }
  });
  return BST;
};

MinSerchBST.addEventListener('click', event => {
  event.preventDefault();
  if (!BST) return alert('Brak drzewa');
  MinPathContainerBST.resetValue();
  MinPathContainerBST.textContent += BST.searchMin().join('-');
});

MaxSerchBST.addEventListener('click', event => {
  event.preventDefault();
  if (!BST) return alert('Brak drzewa');
  MaxPathContainerBST.resetValue();
  MaxPathContainerBST.textContent += BST.searchMax().join('-');
});

PrintInOrderBST.addEventListener('click', event => {
  event.preventDefault();
  if (!BST) return alert('Brak drzewa');
  InOrderContainerBST.resetValue();
  BST.inOrder();
});

InputBST.addEventListener('keyup', event => {
  const { value } = event.target;
  if (!value) {
    ButtonBST.textContent = 'No data';
    ButtonBST.disabled = true;
    return;
  }

  const elements = value.split(' ').filter(el => el);
  if (elements.length > 10) {
    ButtonBST.textContent = 'Too many numbers :(';
    ButtonBST.disabled = true;
    return;
  }

  let stop = false;
  elements.forEach(element => {
    if (stop) return;
    let num = Number(element);
    if (isNaN(num) || num < 1) {
      ButtonBST.textContent = 'Wrong data';
      ButtonBST.disabled = true;
      stop = true;
      return;
    }
    ButtonBST.textContent = 'Generate BST';
    ButtonBST.disabled = false;
  });
});

ButtonBST.addEventListener('click', event => {
  event.preventDefault();
  const { value } = InputBST;
  if (!value) return;
  ButtonBST.disabled = true;
  ButtonBST.textContent = 'No Data';
  InOrderContainerBST.resetValue();
  PostOrderContainerBST.resetValue();
  InputBST.value = '';
  const source = value
    .split(' ')
    .filter(el => el)
    .map(el => Number(el));
  BST = generateBST(source);
  BST.postOrder();
  BST.inOrder();
  console.log(BST);
});

DrawBST.addEventListener('click', event => {
  event.preventDefault();
  if (!BST) return alert('Brak drzewa');
});
