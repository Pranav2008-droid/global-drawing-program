var strokeWeightInput, submit;
var strokeColorInput;

var strokeValue;

var bginput;
var bgcolor = 255;

var clear;

var canvas1;
var canvas2;

strokeWeightValue = 0;

function setup(){
    strokeWeightInput = createInput();
    strokeWeightInput.position(150, 20);

    strokeColorInput = createInput();
    strokeColorInput.position(150, 80);

    bginput = createInput();
    bginput.position(150, 140);

    submit = createButton('submit');
    submit.position(windowWidth / 20,windowHeight/ 4);
    submit.mousePressed(Submit)

    clear = createButton('clear');
    clear.position(windowWidth / 8, windowHeight/ 4);
    clear.mousePressed(Clear);
    // createCanvas(windowWidth, windowHeight);

    canvas1 = createCanvas(windowWidth, windowHeight)
    background(52, 255);
    canvas2 = createCanvas(windowWidth, windowHeight)


    canvas2.strokeWeight(2);

    canvas2.stroke(255)
    text("stroke thickness: ", 10, 20, 150, 150)
    text("stroke color(red, green , blue, yellow etc):" , 10, 60, 150, 150)
    text("background color(red, green , blue, yellow etc):" , 10, 120, 150, 150)



}

function draw(){

    strokeWeight(strokeWeightValue);
    // stroke(strokeValue)
    canvas2.text("stroke thickness: ", 10, 20, 150, 150)
    canvas2.text("stroke color(red, green , blue, yellow etc):" , 10, 60, 150, 150)
    canvas2.text("background color(red, green , blue, yellow etc):" , 10, 120, 150, 150)

}

function mouseDragged(){
    canvas1.stroke(strokeValue);
    canvas1.line(mouseX, mouseY, pmouseX, pmouseY);
}

function Submit(){

    canvas2.text("stroke color(red, green , blue, yellow etc)", 50, 60, 150, 170)

    canvas2.text("stroke thickness", 50, 20, 150, 150)

    let weightvalue = strokeWeightInput.value();
    strokeWeightValue = weightvalue;
    let colorvalue = strokeColorInput.value();
    strokeValue = colorvalue
    bgcolor = bginput.value();
    canvas1.background(bgcolor);
}



function Clear(){
    background(bgcolor);
}