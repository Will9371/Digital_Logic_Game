var savedTarget = null;
var gameRunning = false;
var advanceRow = 0;
var wireSetting = true;
//var sleeping = false;

var tool = 0;           //wire, connect, or trash (or also includes gates?)
var gateType = 0;       //and, or, not, etc.
var typeWire = 1;
var typeOr = 2;
var typeAnd = 3;
var typeNot = 4;
var typeXor = 5;
var typeNand = 6;
var typeNor = 7;
var typeConnect = 8;
var typeInput = 9;
var typeTrash = 10;
var typeClear = 11;
var typeTerminal = 12;

var gridSize = 10;      //used for snapToGrid
var padding = 10;
var wiggleRoom = 4;

var creatureImages = 25; //Constant, refers to number of images in creature .png file

var flowOff = "Off";    //Hi-Z state
var flowIn = "In";      //Recieving signal, On or Off
var flowOut = "Out";    //Sending signal, On or Off

var stateDisconnect = "Disconnect";
var stateOn = "On";
var stateOff = "Off";

var stateRed = "Red";  
var stateGreen = "Green";
var stateBlue = "Blue";
var stateYellow = "Yellow";  
var statePurple = "Purple";
var stateTeal = "Teal";
var stateWhite = "White";

var startX = 0;				//used for drawing lines
var startY = 0;
var endX = 0;
var endY = 0;

var dragWidth = 0;			//used to prevent dropping objects on objects
var dragHeight = 0;

var inputCount = 4;         //Edit: make this into a variable to increase/decrease inputs
var uniquePaths = inputCount;  //Until connectors get involved, there is one path per input

var gateNames = ["A", "B", "C", "D"];

var zapId = document.getElementById("zapSound");

var cvs = document.getElementById("widgetsCanvas"); //set up canvases
var ctx = cvs.getContext("2d");

var cvsLine = document.getElementById("lineCanvas"); //???
var ctxLine = cvsLine.getContext("2d");

var cvsGame = document.getElementById("gameCanvas");
var ctxGame = cvsGame.getContext("2d");

var cvsTesla = document.getElementById("teslaCanvas");
var ctxTesla = cvsTesla.getContext("2d");

var rectCanvas = cvs.getBoundingClientRect();
var rectGame = cvsGame.getBoundingClientRect();

var widgetArray  = [];          //start with no widgets in array

var inputImage = new Image();   //create images for gates
inputImage.src = "input.png";
var notImage = new Image();
notImage.src = "onOffNot.png";
var andImage = new Image();
andImage.src = "onOffAnd.png";
var nandImage = new Image();
nandImage.src = "onOffNand.png";
var orImage = new Image();
orImage.src = "onOffOr.png";
var norImage = new Image();
norImage.src = "onOffNor.png";
var xorImage = new Image();
xorImage.src = "onOffXor.png";
var terminalImage = new Image();
terminalImage.src = "onOffTerminal.png";

var teslaImageRed = new Image();    //create images for the zapping electricity
teslaImageRed.src = "teslaRed.png";
var teslaImageGreen = new Image();
teslaImageGreen.src = "teslaGreen.png";
var teslaImageBlue = new Image();
teslaImageBlue.src = "teslaBlue.png";
var teslaImageYellow = new Image();
teslaImageYellow.src = "teslaYellow.png";
var teslaImagePurple = new Image();
teslaImagePurple.src = "teslaPurple.png";
var teslaImageTeal = new Image();
teslaImageTeal.src = "teslaTeal.png";
var teslaImageWhite = new Image();
teslaImageWhite.src = "teslaWhite.png";

inputImage.addEventListener("load", startupHandler, false);     //when game loads, call startup functions
terminalImage.addEventListener("load", createTerminal, false);
teslaImageRed.addEventListener("load", loadTeslaImageRed, false);
teslaImageGreen.addEventListener("load", loadTeslaImageGreen, false);
teslaImageBlue.addEventListener("load", loadTeslaImageBlue, false);
teslaImageYellow.addEventListener("load", loadTeslaImageYellow, false);
teslaImagePurple.addEventListener("load", loadTeslaImagePurple, false);
teslaImageTeal.addEventListener("load", loadTeslaImageTeal, false);
teslaImageWhite.addEventListener("load", loadTeslaImageWhite, false);
document.addEventListener("contextmenu", function(e){e.preventDefault();}, false);

function rectangle(x, y, w, h) //general purpose Rectangle object
{
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
    this.left = x;
    this.top = y;
    this.right = x + w;
    this.bottom = y + h;
}

function rectIntersect(rect1, rect2)							//determine if two rectangles intersect
{
	if (rect1.left > rect2.right || rect1.right < rect2.left ||
        rect1.top > rect2.bottom || rect1.bottom < rect2.top)
            return false;
    return true;
}

function ptInRect(x, y, rect)									//is a given point inside a rectangle?
{
	if (x > rect.left && x < rect.left + rect.width && y > rect.top && y < rect.top + rect.height)
        	return true;
    return false;
}

function tip(x, y, f, o, s)		//all objects have 1, 2 or 3 tips.  these are where wires connect to other wires or gates
{
    this.x = x;             //position of tip on the screen
    this.y = y;
    this.rect = new rectangle(x - 4, y - 4, 8, 8);  //left edge, top edge (-> topleft corner), width, height -> create 4x4 rectangle
    this.flow = f;        //whether the tip sends or receives signals
    this.owner = o;         //wire or widget the tip is a part of
    this.state = s;         //whether the tip is in the ON or OFF state.
    this.tipConnect = null; //which wire or widget the tip is connected to
}

function widget()  				//parent prototype for all widgets, never created directly
{
    this.state = null;
    this.rect = null;
    this.type = null;
    this.tips = null;
    this.visited = 0;
    this.widgetDraw = function(toolImage)
    {
	    this.erase();
        var sx = 0;     //Default: use left half of image file (sx = the x coordinate at which to start clipping)
        var height = toolImage.height;
        var width = toolImage.width / 2;
    	if (this.state == stateOn)
   		   sx = width;  //if wire or gate is on, use right half of image file
    	ctx.drawImage(toolImage, sx, 0, width, height, this.rect.x, this.rect.y, width, height);
    }
    this.lineDraw = function()		//line draw only called for wires
    {	
    	this.erase();
    	ctx.beginPath(); 
    	ctx.moveTo(this.fromX, this.fromY);
    	ctx.lineTo(this.toX, this.toY);
        if (this.state == stateOff || this.state == stateDisconnect)    //color of wire as drawn
    		ctx.strokeStyle = "Black";                        //depends on what it is connected to
        else
        	ctx.strokeStyle = "Aqua";
    	ctx.stroke();	
        if (this.tips.length > 2)		//wire has a connector
        {
        	ctx.beginPath();
			ctx.arc(this.tips[2].x,this.tips[2].y,4,0,2*Math.PI);
            if (this.state == stateOff)
    			ctx.fillStyle = "Black";
        	else
        		ctx.fillStyle = "Aqua";
			ctx.fill();
        }
    }
    this.erase = function()
    {
	   ctx.clearRect(this.rect.x, this.rect.y, this.rect.width, this.rect.height);
    }
}
                    //constructor functions for gates
function notGate()  //prototype for creating objects of type "notGate"
{ 
    this.type = typeNot;
    this.state = stateOn;
    this.draw = function() { this.widgetDraw(notImage); }
} 
notGate.prototype = new widget(); //this is how wire inherits from widget

function andGate()  //prototype for creating objects of type "notGate"
{
	this.type = typeAnd;
    this.state = stateOff;
    this.draw = function() { this.widgetDraw(andImage); }
} 
andGate.prototype = new widget(); //this is how wire inherits from widget

function nandGate()  //prototype for creating objects of type "nandGate"
{
    this.type = typeNand;
    this.state = stateOn;
    this.draw = function() { this.widgetDraw(nandImage); }
} 
nandGate.prototype = new widget(); //this is how nand inherits from widget

function orGate()  //prototype for creating objects of type "notGate"
{   
    this.type = typeOr;
    this.state = stateOff;
    this.draw = function() { this.widgetDraw(orImage); }
} 
orGate.prototype = new widget(); //this is how or inherits from widget

function norGate()  //prototype for creating objects of type "norGate"
{   
    this.type = typeNor;
    this.state = stateOn;
    this.draw = function() { this.widgetDraw(norImage); }
} 
norGate.prototype = new widget(); //this is how nor gate inherits from widget

function xorGate()  //prototype for creating objects of type "notGate"
{   
    this.type = typeXor;
    this.state = stateOff;
    this.draw = function() { this.widgetDraw(xorImage); }
} 
xorGate.prototype = new widget(); //this is how wire inherits from widget

function input() //prototype for creating objects of type "input"
{
    this.type = typeInput;
    this.state = stateOff;
    this.draw = function() { this.widgetDraw(inputImage); }
}
input.prototype = new widget(); //this is how input inherits from widget

function terminal() //prototype for creating objects of type "terminal" (output)
{
	this.type = typeTerminal;
    this.state = stateOff;
    this.draw = function() { this.widgetDraw(terminalImage); }
}
terminal.prototype = new widget(); //this is how terminal inherits from widget

function wire(fromX, fromY, toX, toY) //prototype for creating objects of type "wire"
{
	this.fromX = fromX;
    this.fromY = fromY;
    this.toX = toX;
    this.toY = toY;
	this.type = typeWire;
    this.state = stateDisconnect;
    this.draw = function() { this.lineDraw( ); }    //A method named "draw" is used in multiple objects
}                                                   //for the wire object, it is a lineDraw (see widget object)
wire.prototype = new widget(); //this is how input inherits from widget

function startupHandler() //postpone displaying inputs until image has been loaded
{
	var newInput = null;
    var x = 40;
    var y = 90;
    var i = 0;
    ctx.font="20px Georgia";
    for (i = 0; i < inputCount; i++)
    {   //place and label input terminals
    	ctx.fillText(gateNames[i], x - 20, y + 25);
		newInput = new input();
        newInput.tips = [];
        newInput.tips[0] = new tip(x + (inputImage.width / 2), y + (inputImage.height / 2), flowOut, newInput, stateOff);
    	newInput.rect = new rectangle(x, y, inputImage.width / 2, inputImage.height);
    	newInput.state = stateOff;
    	newInput.draw();
    	widgetArray.push(newInput);
        y += 90;
    }    
    drawGameGrid();
    var option = null;
    var levelSelector = document.getElementById("selectLevel");
    for(i in levelNames)
    {
    	option = document.createElement("option");
        option.text = levelNames[i];
        levelSelector.add(option);
    }
    reset();
}

function createTerminal()	//postpone drawing terminal until its image has loaded
{
	var x = snapToGrid(rectCanvas.right - rectCanvas.left - (terminalImage.width / 2));    //set terminal position (relative to canvas edges)
    var y = snapToGrid(rectCanvas.bottom - rectCanvas.top - terminalImage.height);
	var newTerminal = new terminal();
    newTerminal.tips = [];
    newTerminal.tips[0] = new tip(x, y + (terminalImage.height / 4),flowIn, newTerminal, stateOff);
    newTerminal.tips[1] = new tip(x, y + (terminalImage.height / 2),flowIn, newTerminal, stateOff);
    newTerminal.tips[2] = new tip(x, y + (terminalImage.height * (3/4)),flowIn, newTerminal, stateOff);
    newTerminal.tips[3] = new tip(x + (terminalImage.width / 2), y + (terminalImage.height / 2), flowOut, newTerminal, stateOff);
    newTerminal.rect = new rectangle(x, y, terminalImage.width / 2, terminalImage.height);
    newTerminal.state = stateOff;
    newTerminal.draw();
    widgetArray.push(newTerminal);
}

