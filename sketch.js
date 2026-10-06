
const CANVAS_SIZE = 600 
const GRID_DIMENSION = 12
const CELL_SIZE = CANVAS_SIZE / GRID_DIMENSION
const ROW_AMOUNT = GRID_DIMENSION
const COLUMN_AMOUNT = GRID_DIMENSION
const PAPER_COLOUR = "#F4F0E6"
const NOISE_SCALE = 0.3
let inks = {
    pink: "#FF48B0",
    blue: "#0078BF",
    yellow: "#FFE800"
}

//what is this function doing?
//this function controls all of the noise, it takes x & y then is called when needed
function noiseFunction (x,y){
    let n = noise(NOISE_SCALE * x, NOISE_SCALE * y)
    // NOTE: no return = the function gives back undefined. return is how n gets out.
    return n
}

// picks an ink for a cell based on its noise value (noise() returns 0-1, mostly clustered around 0.5)
function fillInk (x,y){
    // NOTE: variables only live inside their own function. To use another function's value, call it and store it.
    let n = noiseFunction(x, y)
    if (n < 0.4) {
        return inks.blue
    } else if (n < 0.6) {
        return inks.pink
    } else {
        return inks.yellow
    }
}

function DrawGrid (){
    for (let x = 0; x < COLUMN_AMOUNT; x++) {
      for (let y = 0; y < ROW_AMOUNT; y++) {
        let px = x * CELL_SIZE;
        let py = y * CELL_SIZE;
        // NOTE: fillInk now returns a colour instead of calling fill(), so it's wrapped in fill() here. Only wrap a function that returns a value.
        fill(fillInk(x, y));
        noStroke();
        
        rect (px,py,CELL_SIZE,CELL_SIZE);
        
      }
    }
}

    function setup() {
  createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  noLoop();
   
}


function draw() {
  
  background(PAPER_COLOUR);
  DrawGrid()
}

// press 's' to save the canvas as a PNG
function keyPressed() {
  if (key === 's') {
    saveCanvas('riso_tiles', 'png');
  }
}
