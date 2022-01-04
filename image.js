var myImg = "";
var resultsArray = [];
var statusVar = "";

function preload() {
    myImg = loadImage("babyRoom.jpg");
}

function setup() {
    canvas = createCanvas(600, 400);
    canvas.center();
    model = ml5.objectDetector("cocossd", modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting...";
}

function modelLoaded() {
    console.log("Model loaded.");
    statusVar = true;
    model.detect(myImg, getResults);
}

function getResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        resultsArray = results;
    }
}

function draw() {
    image(myImg, 0, 0, 600, 400);
    if (statusVar != "") {
        for (i = 0; i < resultsArray.length; i++) {
            document.getElementById("status").innerHTML = "";
            confidence = floor(resultsArray[i].confidence * 100) + "%";
            fill("red");
            text(resultsArray[i].label + " " + confidence + " sure", resultsArray[i].x + 20, resultsArray[i].y + 20);
            noFill();
            stroke("red");
            rect(resultsArray[i].x, resultsArray[i].y, resultsArray[i].width, resultsArray[i].height);
        }
    }
}