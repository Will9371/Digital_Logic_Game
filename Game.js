var creatureImage = new Image();
creatureImage.src = "creatures.png";

var teslaFrameWidth = 0;

var zapSound = new Audio("zap.wav"); 

var curChallenge = [];
var startRow = 0;
var indexLevel = 0;

var gameTimer = null;
var zapTimer = null;
var zapCount = 0;
var frameCount = 0;

var skelsSpared = 0;
var guysZapped = 0;

function loadTeslaImageRed()
{   //set image parameters before the image is displayed
	teslaFrameWidth = teslaImageRed.width / 7;
	drawTeslaOff();
}
function loadTeslaImageGreen()
{
	teslaFrameWidth = teslaImageGreen.width / 7;
	drawTeslaOff();
}
function loadTeslaImageBlue()
{
	teslaFrameWidth = teslaImageBlue.width / 7;
	drawTeslaOff();
}
function loadTeslaImageYellow()
{   
	teslaFrameWidth = teslaImageYellow.width / 7;
	drawTeslaOff();
}
function loadTeslaImagePurple()
{   
	teslaFrameWidth = teslaImagePurple.width / 7;
	drawTeslaOff();
}
function loadTeslaImageTeal()
{
	teslaFrameWidth = teslaImageTeal.width / 7;
	drawTeslaOff();
}
function loadTeslaImageWhite()
{
	teslaFrameWidth = teslaImageWhite.width / 7;
	drawTeslaOff();
}

function enableGates()      //this function enables all of the logic gates in the game
{    
    enableGate("orSelect");
    enableGate("norSelect");
    enableGate("andSelect");
    enableGate("nandSelect");
    enableGate("xorSelect");
    enableGate("notSelect");
}
function enableGate(gateName)
{
    var gate = document.getElementById(gateName);        
    gate.setAttribute("draggable", true); //enable use of or gate
    gate.style.opacity = "1.0"; //and make it visible
}
function disableGates()  //This function disables certain gates, based on Challenges array
{    
    if (disable[indexLevel][0] == 1) { disableGate("orSelect"); } 
    if (disable[indexLevel][1] == 1) { disableGate("norSelect"); } 
    if (disable[indexLevel][2] == 1) { disableGate("andSelect"); } 
    if (disable[indexLevel][3] == 1) { disableGate("nandSelect"); } 
    if (disable[indexLevel][4] == 1) { disableGate("xorSelect"); } 
    if (disable[indexLevel][5] == 1) { disableGate("notSelect"); } 
}

function disableGate(gateName)
{
    var gate = document.getElementById(gateName);
    gate.setAttribute("draggable", false);
    gate.style.opacity = "0.1";
}

function drawTeslaOff()
{
	cvsTesla.style.zIndex = 1;
	ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImageRed.height);
	ctxTesla.drawImage(teslaImageRed, 0, 0, teslaFrameWidth, teslaImageRed.height, 
    			       0, 0, teslaFrameWidth, teslaImageRed.height);
    cvsTesla.style.zIndex = -1;
}

function drawGameGrid() //this function draws the truth table
{
	var x = 0;
    var y = 0;
	ctxGame.clearRect(0, 0, rectGame.width, rectGame.height);
	ctxGame.beginPath();
    for (x = 0, y = 0; x < 120; x += 30)    
    {
    	ctxGame.moveTo(x, y);
        ctxGame.lineTo(x, y + 600);
    }
    for (x = 0, y = 0; y < 600; y += 30)
    {
    	ctxGame.moveTo(x, y);
        ctxGame.lineTo(x + 200, y);
    }
    ctxGame.stroke();
    
    ctxGame.font="20px Georgia";
    ctxGame.fillStyle = "Brown";
    for (i = 0; i < 4; i++)
    {
    	ctxGame.fillText(gateNames[i], (i * (rectGame.width / 4)) + 4, rectGame.height - 10); 
        ctxGame.beginPath();
		ctxGame.arc((i * (rectGame.width / 4)) + 15,rectGame.height - 50,8,0,2*Math.PI);
		ctxGame.fill();
    }
}

function runGame()	//"Run" button runs game off of a timer
{                   //advance every 1 second 
  if (gameRunning == true)  //If game is already running,
    return;                 //ignore this event
  gameRunning = true;       //Otherwise, advance at regular intervals
  gameTimer = setInterval(advance, 100);
}

function advance()
{
    if (gameRunning == false) //in run mode, advance is divided into 10 parts
        advanceRow = 0;       //move on 0, blink on 1, blink off 2, end on 10
    if (advanceRow == 0)      //if the user presses step, advance is in just 1 part.
    {
        var zapped = false;
        drawGameGrid();
        if (startRow >= curChallenge.length)    //reset level when all creatures have passed
        {
            displayResults();
            startRow = 0;
            drawCreatureGrid(rectGame.height - 93, startRow);
            clearInterval(gameTimer);
            gameRunning = false;
            return;
        }
        drawCreatureGrid(rectGame.height - 63, startRow); 

        for (col in curChallenge[startRow])			    //step through columns to turn on Inputs
        {                                               //if nothing, or a baby, is stepping on a button,
            if (curChallenge[startRow][col] == 0 || (curChallenge[startRow][col] > 4 && curChallenge[startRow][col] < 9))       
                widgetArray[col].state = stateOff;      //then the input corresponding with that button is off
            else
                widgetArray[col].state = stateOn;       //otherwise the input is on
            clearVisited();                             //reset visited so endless loop detector not triggered too early
            setState(widgetArray[col]);                 //Set the input's state, which recursively sets connected wire states
        }

        for (col in curChallenge[startRow])				//then step through columns again to see who got zapped
        { 
            if (widgetArray[4].state == stateOn)		//if the terminal is on (inputs = 0-3, terminal = 4)
            {
                if (curChallenge[startRow][col] > 0)    //and the level is not the sandbox
                {                                       //(redundant because no characters in that level)
                    if (zapped == false)                //and if not currently zapping
                    {
                        animateZap(widgetArray[4].color); //then zap
                        zapped = true;
                    }
                }   //if there is a human or a zapped human on the button when the tesla coil is on
                if (curChallenge[startRow][col] == 1 || curChallenge[startRow][col] == 3 
                    || curChallenge[startRow][col] == 5 || curChallenge[startRow][col] == 7)
                        guysZapped++;  //increment humans zapped counter
                if (curChallenge[startRow][col] == 1 || curChallenge[startRow][col] == 2
                    || curChallenge[startRow][col] == 5 || curChallenge[startRow][col] == 6)
                {   //if there is an unzapped human or zombie on the button,
                    curChallenge[startRow][col] += 2;  //zap them
                    drawCreatureGrid(rectGame.height - 63, startRow);   //redraw the row because something changed
                }
                if (curChallenge[startRow][col] == 9)   //if there is an unzapped tumbleweed, zap it
                {
                  curChallenge[startRow][col] += 1;
                  drawCreatureGrid(rectGame.height - 63, startRow);
                }
                
                if (curChallenge[startRow][col] == 12 && widgetArray[4].color == stateRed       //if there is an unzapped colored zombie
                   || curChallenge[startRow][col] == 14 && widgetArray[4].color == stateGreen   //and the tesla is zapping that same color
                   || curChallenge[startRow][col] == 16 && widgetArray[4].color == stateBlue
                   || curChallenge[startRow][col] == 18 && widgetArray[4].color == stateYellow
                   || curChallenge[startRow][col] == 20 && widgetArray[4].color == statePurple
                   || curChallenge[startRow][col] == 22 && widgetArray[4].color == stateTeal
                   || curChallenge[startRow][col] == 24 && widgetArray[4].color == stateWhite)                
                {
                    curChallenge[startRow][col] += 1;                                           //the zombie gets zapped
                    drawCreatureGrid(rectGame.height - 63, startRow);                           //and redraw grid
                }
                else if (curChallenge[startRow][col] == 12 && widgetArray[4].color != stateRed  //If there is an unzapped colored zombie,     
                   || curChallenge[startRow][col] == 14 && widgetArray[4].color != stateGreen   //and the tesla is a different color,
                   || curChallenge[startRow][col] == 16 && widgetArray[4].color != stateBlue    
                   || curChallenge[startRow][col] == 18 && widgetArray[4].color != stateYellow
                   || curChallenge[startRow][col] == 20 && widgetArray[4].color != statePurple
                   || curChallenge[startRow][col] == 22 && widgetArray[4].color != stateTeal
                   || curChallenge[startRow][col] == 24 && widgetArray[4].color != stateWhite) 
                    skelsSpared++;                                                              //increment skelsSpared counter. 
                else if (curChallenge[startRow][col] == 13 && widgetArray[4].color != stateRed  //If there is a zapped colored zombie     
                   || curChallenge[startRow][col] == 15 && widgetArray[4].color != stateGreen   //and the tesla is a different color
                   || curChallenge[startRow][col] == 17 && widgetArray[4].color != stateBlue    
                   || curChallenge[startRow][col] == 19 && widgetArray[4].color != stateYellow
                   || curChallenge[startRow][col] == 21 && widgetArray[4].color != statePurple
                   || curChallenge[startRow][col] == 23 && widgetArray[4].color != stateTeal
                   || curChallenge[startRow][col] == 25 && widgetArray[4].color != stateWhite)
                {
                    curChallenge[startRow][col] -= 1;                                           //then unzap it
                    skelsSpared++;                                                              //increment spared counter
                    drawCreatureGrid(rectGame.height - 63, startRow);                           //and redraw grid
                }
            }
            
            else    //otherwise, if the tesla coil is off
            {       //and there is a zombie or a zapped zombie on the button
                if (curChallenge[startRow][col] == 2 || curChallenge[startRow][col] == 4
                   || curChallenge[startRow][col] == 6 || curChallenge[startRow][col] == 8
                   || curChallenge[startRow][col] == 12 || curChallenge[startRow][col] == 14
                   || curChallenge[startRow][col] == 16 || curChallenge[startRow][col] == 18
                   || curChallenge[startRow][col] == 20 || curChallenge[startRow][col] == 22
                   || curChallenge[startRow][col] == 24)
                        skelsSpared++;     //increment the zombies spared counter
                
                if (curChallenge[startRow][col] == 3 || curChallenge[startRow][col] == 4
                   || curChallenge[startRow][col] == 7 || curChallenge[startRow][col] == 8)
                {   //In addition, if there is a zapped character on the button,
                    curChallenge[startRow][col] -= 2;  //unzap them
                    drawCreatureGrid(rectGame.height - 63, startRow);   //and redraw the row
                }
                if (curChallenge[startRow][col] == 10 || curChallenge[startRow][col] == 13                                      
                   || curChallenge[startRow][col] == 15 || curChallenge[startRow][col] == 17
                   || curChallenge[startRow][col] == 19 || curChallenge[startRow][col] == 21
                   || curChallenge[startRow][col] == 23 || curChallenge[startRow][col] == 25)  
                { //if there is a zapped tumbleweed or colored zombie on the button
                  curChallenge[startRow][col] -= 1;     //unzap it, but only subtract 1 from curChallenge b/c of how sprite is drawn
                  drawCreatureGrid(rectGame.height - 63, startRow); //and redraw the row
                }
            }
        }
        if(gameRunning == true)
            advanceRow++;
    }
    
    if (gameRunning == true)
    {
        if (advanceRow == 1)    //blink tesla on
        {
            advanceRow++;
            for (col in curChallenge[startRow])
                if (curChallenge[startRow][col] == 11)
                {
                  widgetArray[col].state = stateOn;
                  clearVisited();
                  setState(widgetArray[col]);
                }
            return;
        }
        if (advanceRow == 2)    //blink tesla off
        {
            advanceRow++;
            for (col in curChallenge[startRow])
                if (curChallenge[startRow][col] == 11)
                {
                  widgetArray[col].state = stateOff;
                  clearVisited();
                  setState(widgetArray[col]);
                }
            return;
        }
        if (advanceRow < 10)
        {
            advanceRow++;
            return;
        }
        if (advanceRow == 10)
          advanceRow = 0;
    }
    startRow++;
}

function animateZap(teslaColor) //called by advance(), teslaColor = widgetArray[4].color
{
    zapId.play();
	cvsTesla.style.zIndex = 1;
    zapCount = 0;
    frameCount = 1;
    clearInterval(zapTimer);   //If user advances twice quickly (before previous complete), clear previous interval.
	zapTimer = setInterval(zap.bind(null, teslaColor),100);    //bind method used to continue to pass teslaColor to zap()
	zap(teslaColor);
}

function zap(teslaColor)      //Animate the zapping electricity
{
    switch(teslaColor)
    {
        case stateRed:
            ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImageRed.height);
            ctxTesla.drawImage(teslaImageRed, teslaFrameWidth * frameCount, 0, teslaFrameWidth, teslaImageRed.height, 
                               0, 0, teslaFrameWidth, teslaImageRed.height);
            break;
        case stateGreen:
            ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImageGreen.height);
            ctxTesla.drawImage(teslaImageGreen, teslaFrameWidth * frameCount, 0, teslaFrameWidth, teslaImageGreen.height, 
                               0, 0, teslaFrameWidth, teslaImageGreen.height);
            break;
        case stateBlue:
            ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImageBlue.height);
            ctxTesla.drawImage(teslaImageBlue, teslaFrameWidth * frameCount, 0, teslaFrameWidth, teslaImageBlue.height, 
                               0, 0, teslaFrameWidth, teslaImageBlue.height);
            break;
        case stateYellow:
            ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImageYellow.height);
            ctxTesla.drawImage(teslaImageYellow, teslaFrameWidth * frameCount, 0, teslaFrameWidth, teslaImageYellow.height, 
                               0, 0, teslaFrameWidth, teslaImageYellow.height);
            break;
        case statePurple:
            ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImagePurple.height);
            ctxTesla.drawImage(teslaImagePurple, teslaFrameWidth * frameCount, 0, teslaFrameWidth, teslaImagePurple.height, 
                               0, 0, teslaFrameWidth, teslaImagePurple.height);
            break;
        case stateTeal:
            ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImageTeal.height);
            ctxTesla.drawImage(teslaImageTeal, teslaFrameWidth * frameCount, 0, teslaFrameWidth, teslaImageTeal.height, 
                               0, 0, teslaFrameWidth, teslaImageTeal.height);
            break; 
        case stateWhite:
            ctxTesla.clearRect(0, 0, teslaFrameWidth, teslaImageWhite.height);
            ctxTesla.drawImage(teslaImageWhite, teslaFrameWidth * frameCount, 0, teslaFrameWidth, teslaImageWhite.height, 
                               0, 0, teslaFrameWidth, teslaImageWhite.height);
            break;
        default:
            console.log("Error: undefined tesla color");
    }
	zapCount++;
    frameCount++;
    if (frameCount > 6)
    	frameCount = 1;
    if (zapCount > 10)
    {
    	clearInterval(zapTimer);
        drawTeslaOff();
    }
}

function displayResults()
{
	var result = document.getElementById("textResult");    //set variables from html references
    var stats = document.getElementById("textStats");
    if (guysZapped == 0 && skelsSpared == 0)    //victory condition is always the same
    	result.innerHTML = " Congratulations! <br /> You won!";
    else
    	result.innerHTML = " Sorry, you lost. <br /> Try again";
    stats.innerHTML = "Happy guys zapped: " + guysZapped + "<br />" +
    				"Skeletors spared: " + skelsSpared;
    guysZapped = 0;     //reset score after game over
    skelsSpared = 0;
    var msg = document.getElementById("textMessage");
    msg.innerHTML = "";
}

function reset()
{
	clearInterval(gameTimer);          //In case player clicked reset button while game is running
    gameRunning = false;
    advanceRow = 0;
  
    for (i1 in curChallenge)
    {
    	for (i2 in curChallenge[i1])   //for each cell, if the cell contains a zapped character, 
        {                              //replace it with an unzapped character of the same type.
        	switch(curChallenge[i1][i2])
            {
                case 3:
                    curChallenge[i1][i2] = 1;
                    break;
                case 4:
                    curChallenge[i1][i2] = 2;
                    break;                        
                case 7:
                    curChallenge[i1][i2] = 5;
                    break;
                case 8:
                    curChallenge[i1][i2] = 6;
                    break;
                case 10:
                    curChallenge[i1][i2] = 9;
                    break;
                case 13:
                    curChallenge[i1][i2] = 12;
                    break;
                case 15:
                    curChallenge[i1][i2] = 14;
                    break;
                case 17:
                    curChallenge[i1][i2] = 16;
                    break;
                case 19:
                    curChallenge[i1][i2] = 18;
                    break;
                case 21:
                    curChallenge[i1][i2] = 20;
                    break;
                case 23:
                    curChallenge[i1][i2] = 22;
                    break;
                case 25:
                    curChallenge[i1][i2] = 24;
                    break;                        
                default:  
                    break;
            }
        }
    }
    drawGameGrid();
    startRow = 0;
    guysZapped = 0;
    skelsSpared = 0;
    drawCreatureGrid(rectGame.height - 93, startRow);
    var result = document.getElementById("textResult");
    var stats = document.getElementById("textStats");
    var msg = document.getElementById("textMessage");
    result.innerHTML = "";
    stats.innerHTML = "";
    msg.innerHTML = message[indexLevel];
}

function levelChange(event)
{
	indexLevel = document.getElementById("selectLevel").selectedIndex;
    curChallenge = [];
    curChallenge = challenge[indexLevel].slice(0);
    drawGameGrid();
    reset();
    startRow = 0;
    drawCreatureGrid(rectGame.height - 93, startRow);
    enableGates();
    disableGates();
    clearScreen();
}

function drawCreatureGrid(startY, startRow)
{
	var y = startY;
	for (i1 = startRow; i1 < curChallenge.length; i1++)    //for each row in the level
    {
    	x = 2;
    	curRow = curChallenge[i1];	//look at the row
        for (i2 in curRow)          //for each cell in the row
        {
        	switch (curRow[i2])     //check the identity of the creature in it
            {	
            	case 0:             //empty
                	break;
                case 1:             //human
                	drawCreature(x, y, 0);
             		break;
                case 2:             //zombie
        			drawCreature(x, y, creatureImage.width * (2/creatureImages)); //start drawing with an offset of 2/8 
                	break;                                           //from the left of the source image
                case 3:             //zapped human
                	drawCreature(x, y, creatureImage.width * (1/creatureImages));
                    break;
                case 4:             //zapped zombie
                	drawCreature(x, y, creatureImage.width * (3/creatureImages));
                    break;
                case 5:             //baby human
                    drawCreature(x, y, creatureImage.width * (4/creatureImages));
                    break;
                case 6:             //baby zombie
                    drawCreature(x, y, creatureImage.width * (6/creatureImages));
                    break;
                case 7:             //zapped baby human
                    drawCreature(x, y, creatureImage.width * (5/creatureImages));
                    break;  
                case 8:             //zapped baby zombie
                    drawCreature(x, y, creatureImage.width * (7/creatureImages))
                    break; 
                case 9:             //tumbleweed
                    drawCreature(x, y, creatureImage.width * (8/creatureImages))
                    break;
                case 10:            //zapped tumbleweed
                    drawCreature(x, y, creatureImage.width * (9/creatureImages))
                    break;
                case 11:            //zapped bouncy ball
                    drawCreature(x, y, creatureImage.width * (10/creatureImages))
                    break;
                case 12:            //red zombie
                    drawCreature(x, y, creatureImage.width * (11/creatureImages))
                    break;
                case 13:            //red zapped zombie
                    drawCreature(x, y, creatureImage.width * (12/creatureImages))
                    break;
                case 14:            //green zombie
                    drawCreature(x, y, creatureImage.width * (13/creatureImages))
                    break;
                case 15:            //green zapped zombie
                    drawCreature(x, y, creatureImage.width * (14/creatureImages))
                    break; 
                case 16:            //blue zombie
                    drawCreature(x, y, creatureImage.width * (15/creatureImages))
                    break;
                case 17:            //blue zapped zombie
                    drawCreature(x, y, creatureImage.width * (16/creatureImages))
                    break;
                case 18:            //yellow zombie
                    drawCreature(x, y, creatureImage.width * (17/creatureImages))
                    break;
                case 19:            //yellow zapped zombie
                    drawCreature(x, y, creatureImage.width * (18/creatureImages))
                    break;
                case 20:            //purple zombie
                    drawCreature(x, y, creatureImage.width * (19/creatureImages))
                    break;
                case 21:            //purple zapped zombie
                    drawCreature(x, y, creatureImage.width * (20/creatureImages))
                    break;
                case 22:            //teal zombie
                    drawCreature(x, y, creatureImage.width * (21/creatureImages))
                    break;
                case 23:            //teal zapped zombie
                    drawCreature(x, y, creatureImage.width * (22/creatureImages))
                    break;  
                case 24:            //white zombie
                    drawCreature(x, y, creatureImage.width * (23/creatureImages))
                    break;
                case 25:            //white zapped zombie
                    drawCreature(x, y, creatureImage.width * (24/creatureImages))
                    break;                    
                default:
                	console.log("unrecognized array element " + curRow[i2]);
            }
        	x += 30;
        }
        y -= 30;
    }
}

function drawCreature(x, y, imageOffset)
{
	var w = creatureImage.width / creatureImages;   //width = one cell of the image file
	var h = creatureImage.height;      //height = full height of the image file

	ctxGame.drawImage(creatureImage, imageOffset, 0, w, h, x, y, w, h);
}


