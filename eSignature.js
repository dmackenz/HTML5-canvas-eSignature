
// stroke weight
var penSize = 3;

// drawing vectors
var present;
var past;

// drawing boolean
var isPressed = false;

// check if canvas is clear
var isClear = true;

var p5_1 = new p5(function(sketch) {
    sketch.setup = function() {
        var canv = sketch.createCanvas(sketch.windowWidth / 4, sketch.windowHeight / 5);
        canv.parent('#eSignatureCanvas');
    
        sketch.background(255);
        sketch.border();
    };

    sketch.draw = function() {
        // while pen is pressed
        if (isPressed == true) {
            // store previous location
            past = present;

            // store new location
            present = sketch.createVector(sketch.mouseX, sketch.mouseY);
            
            if (past) {
                // new line connecting new and previous location
                sketch.line(past.x, past.y, present.x, present.y); 
            }

            // lock scrolling
            $('body').bind('mousewheel touchmove', lockScroll);
        // when screen release clear past & present
        } else {
            // reset
            present = null;
            past = null;

            // enable scrolling
            $('body').unbind('mousewheel touchmove', lockScroll);
        }
    };

    // lock window scrolling
    function lockScroll(e) {
        e.preventDefault();
    }

    sketch.border = function() {
        var spacing = 2;

        // top left corner
        var tl = {
            x: 0,
            y: 0
        }

        // bottom left corner
        var bl = {
            x: 0,
            y: sketch.height - spacing
        }

        // top right corner
        var tr = {
            x: sketch.width - spacing,
            y: 0
        }

        // bottom right corner
        var br = {
            x: sketch.width - spacing,
            y: sketch.height - spacing
        }

        // border stroke weight
        sketch.strokeWeight(1);

        // draw border
        sketch.line(tl.x, tl.y, tr.x, tr.y);
        sketch.line(tl.x, tl.y, bl.x, bl.y);
        sketch.line(tr.x, tr.y, br.x, br.y);
        sketch.line(bl.x, bl.y, br.x, br.y);

        // pen size
        sketch.strokeWeight(penSize);
    };


    // event on screen touch
    sketch.touchStarted = function() {
        if  (
            sketch.mouseX > 0 &&
            sketch.mouseX < sketch.width &&
            sketch.mouseY > 0 &&
            sketch.mouseY < sketch.height
            ) {
            isPressed = true;
        }
    };

    // event on screen release
    sketch.touchEnded = function() {
        isPressed = false;

        if  (
            sketch.mouseX > 0 &&
            sketch.mouseX < sketch.width &&
            sketch.mouseY > 0 &&
            sketch.mouseY < sketch.height
            ) {
            isClear = false;
        }
    }

    // generate random string of length
    sketch.randomString = function(len) {
        var alphabet = "abcdefghijklmnopqrstuvwxyz";
        var ret = "";
        for (var i = 0; i < len; i++) {
            ret += alphabet[sketch.floor(sketch.random(0, alphabet.length))];
        }
        return ret;
    }

    // clear image background
    sketch.clearEvent = function() {
        sketch.background(255);
        sketch.border();
        isClear = true;
    }

});

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
            url: "php-src/upload.php",
            data: { 
                iname: iname,
                data: data
            }
        }).done(function(e) {
        });
    }
}
