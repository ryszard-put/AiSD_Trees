const CANVASWIDTH = 1000;
const CANVASHEIGHT = 700;

let BSTTree;
let controller;
function setup() {
  let canvas = createCanvas(CANVASWIDTH, CANVASHEIGHT);
  canvas.parent('canvas_container');
  BSTTree = new AVL();
  controller = new Controller(BSTTree);
}
