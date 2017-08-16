
// stroke weight
var penSize = 3;

// drawing vectors
var present;
var past;

// drawing boolean
var isPressed = false;

// context
var canv;

// check if canvas is clear
var isClear = true;

function setup() {
    // create canvase
    canv = createCanvas(windowWidth / 3, windowHeight / 5);

    // place canvas inside div
    canv.parent('#eSignatureCanvas');

    // draw border around window
    border();
}

function draw() {
    // while pen is pressed
    if (isPressed == true) {
        // store previous location
        past = present;

        // store new location
        present = createVector(mouseX, mouseY);
        
        if (past) {
            // new line connecting new and previous location
            line(past.x, past.y, present.x, present.y);
        }
    // when screen release clear past & present
    } else {
        present = null;
        past = null;
    }
}

// event on screen touch
function touchStarted() {
    isPressed = true;
    return false;
}

// event on screen release
function touchEnded() {
    isPressed = false;
    isClear = false;
    return false;
}

// generate random string of length
function randomString(len) {
    var alphabet = "abcdefghijklmnopqrstuvwxyz";
    var ret = "";
    for (var i = 0; i < len; i++) {
        ret += alphabet[floor(random(0, alphabet.length))];
    }
    return ret;
}

// save image to server
function saveEvent() {
    if (isClear === true) {
        alert("Signature is not signed");
    } else {
        var canvas = $('canvas')[0];
        var data = canvas.toDataURL('image/png').replace(/data:image\/png;base64,/, '');

        var iname = 'signature_' + randomString(5) + '.png'; 

        $.ajax({
            type: "POST",
            url: "upload.php",
            data: { 
                iname: iname,
                data: data
            }
        }).done(function(e) {
        });
    }
}

// clear image background
function clearEvent() {
    background(255);
    border();
    isClear = true;
}

// create a border around the canvas
function border() {
    var spacing = 2;

    // top left corner
    var tl = {
        x: 0,
        y: 0
    }

    // bottom left corner
    var bl = {
        x: 0,
        y: height - spacing
    }

    // top right corner
    var tr = {
        x: width - spacing,
        y: 0
    }

    // bottom right corner
    var br = {
        x: width - spacing,
        y: height - spacing
    }

    // border stroke weight
    strokeWeight(1);

    // draw border
    line(tl.x, tl.y, tr.x, tr.y);
    line(tl.x, tl.y, bl.x, bl.y);
    line(tr.x, tr.y, br.x, br.y);
    line(bl.x, bl.y, br.x, br.y);

    // pen size
    strokeWeight(penSize);
}