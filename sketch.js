// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/RUSvMxxm_Jo


var bgcolor = "white";
var strokeinp = "black";
var strokeWeightinp = 5;
var database;


var drawing = [];
var currentPath = [];
var isDrawing = false;

askPrompt();

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  canvas.mousePressed(startPath);
  canvas.parent('canvascontainer');
  canvas.mouseReleased(endPath);

  var saveButton = select('#saveButton');
  saveButton.mousePressed(saveDrawing);

  var changeSettings = createButton('change Settings');
  changeSettings.mousePressed(askPrompt);

  var clearButton = select('#clearButton');
  clearButton.mousePressed(clearDrawing);


  database = firebase.database();

  var params = getURLParams();
  console.log(params);
  if (params.id) {
    console.log(params.id);
    showDrawing(params.id);
  }

  var ref = database.ref('drawings');
  ref.on('value', gotData, errData);
}

function startPath() {
  isDrawing = true;
  currentPath = [];
  drawing.push(currentPath);
}

function endPath() {
  isDrawing = false;
}



//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
function draw() {
  background(bgcolor);

  if (isDrawing) {
    var point = {
      x: mouseX,
      y: mouseY
    };
    currentPath.push(point);
  }

  stroke(strokeinp);
  strokeWeight(strokeWeightinp);
  noFill();
  for (var i = 0; i < drawing.length; i++) {
    var path = drawing[i];
    beginShape();
    for (var j = 0; j < path.length; j++) {
      vertex(path[j].x, path[j].y);
    }
    endShape();
  }
}
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw
//FunctionDraw

function saveDrawing() {
  var ref = database.ref('drawings');
  var data = {
    name: 'Pranav',
    drawing: drawing
  };
  var result = ref.push(data, dataSent);
  console.log(result.key);

  function dataSent(err, status) {
    console.log(status);
  }
}

function gotData(data) {
  // clear the listing
  var elts = selectAll('.listing');
  for (var i = 0; i < elts.length; i++) {
    elts[i].remove();
  }

  var drawings = data.val();
  var keys = Object.keys(drawings);
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    //console.log(key);
    var li = createElement('li', '');
    li.class('listing');
    var ahref = createA('#', key);
    ahref.mousePressed(showDrawing);
    ahref.parent(li);

    var perma = createA('?id=' + key, 'permalink');
    perma.parent(li);
    perma.style('padding', '4px');

    li.parent('drawinglist');
  }
}

function errData(err) {
  console.log(err);
}

function showDrawing(key) {
  //console.log(arguments);
  if (key instanceof MouseEvent) {
    key = this.html();
  }

  var ref = database.ref('drawings/' + key);
  ref.once('value', oneDrawing, errData);

  function oneDrawing(data) {
    var dbdrawing = data.val();
    drawing = dbdrawing.drawing;
    //console.log(drawing);
  }
}

function clearDrawing() {
  drawing = [];
}

function askPrompt(){
  bgcolor = prompt("What do you want the background color to be as(example red, blue, green, black, etc)", "white");
  strokeinp = prompt("What do you want the stroke color to be", "black");
  strokeWeightinp = prompt("What to you want the thickness oif the stroke to be", 5)
}