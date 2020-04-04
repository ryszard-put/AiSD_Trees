const CANVASWIDTH = 1000;
const CANVASHEIGHT = 700;
let sleep = ms => new Promise(r => setTimeout(r, ms));

let Tree;
let controller;
function setup() {
  let canvas = createCanvas(CANVASWIDTH, CANVASHEIGHT);
  canvas.parent('canvas_container');
  Tree = new AVL();
  controller = new Controller(Tree, 'avl');
}
