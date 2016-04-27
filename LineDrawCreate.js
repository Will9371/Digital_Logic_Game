function lineMouseDown(event)   //called when user clicks
{                               //ERROR: lineMouseDown undefined in Internet Explorer
    if(wireSetting == true && event.which <=1)     //start wire #restricts wire placement to left click only.
    {
        if (tool != typeWire)   //this function only relevant for wires
            return;
        startX = snapToGrid(event.pageX - rectCanvas.left);
        startY = snapToGrid(event.pageY - rectCanvas.top);
        if (startX == null || startY == null || startX < 100)   //if position is invalid, do not draw a line
            return;
        var existingObj = objectAtPoint(startX, startY);  //check if there is something at mouse location (snapped to grid)
        if (tool == typeWire && (existingObj == null || existingObj.type == typeWire))  
        {                                             //if user has selected a wire,
           endX = startX;                             //and there is nothing at that position already,
           endY = startY;                             //place a wire at that location
           cvsLine.style.zIndex = 1;
           cvsLine.addEventListener("mousemove", lineMouseMove, false);    //call lineMouseMove when mouse moves
           cvsLine.addEventListener("mousedown", lineMouseDown, false);    //call lineMouseUp when mouse button unpressed
        }
        wireSetting = false;    //next click will set wire
    }
    else    //end wire
    {
        var temp;
        if (endX == null || endY == null || endX < 100)
            return;
        if (startX > endX)  //reverse wire direction if extending left of starting point
        {
            temp = startX;
            startX = endX;
            endX = temp;
        }
        if (startY > endY)  //same if extending up
        {
            temp = startY;
            startY = endY;
            endY = temp;
        }
        ctxLine.clearRect(0, 0, cvsLine.width, cvsLine.height);
        cvsLine.removeEventListener("mousemove", lineMouseMove, false); //wire has been placed, so no longer necessary
        cvsLine.removeEventListener("mousedown", lineMouseDown, false);     //to wait for mouse event.
        cvsLine.style.zIndex = -1;    
        createWire();       //once the the wire has been drawn and its position is set, actually create the wire
        wireSetting = true; //next click will start wire 
    }
}

function lineMouseMove(event)
{	
    var testX = event.pageX - rectCanvas.left;
    var testY = event.pageY - rectCanvas.top;
    if (objectAtPoint(testX-4, testY) != null)  //don't extend the line if an object is present
        return;                                 //(x-4 to fix UI error of line stopping short of input by adding margin of error)
    endX = testX;               //if nothing is present at mouse location, extend the wire
    endY = testY;
    ctxLine.clearRect(0, 0, cvsLine.width, cvsLine.height);
    if (Math.abs(startX - endX) > Math.abs(startY - endY))
    	endY = startY;          //wire only extends horizontal or vertical,    
    else                        //depending on which distance is greater
        endX = startX;          //NOTE: diagonal lines would require more complex rectangles
    endX -= endX % gridSize;    //snap to grid
    endY -= endY % gridSize;
    ctxLine.beginPath(); 
    ctxLine.moveTo(startX, startY);
    ctxLine.lineTo(endX, endY);
    ctxLine.strokeStyle = "Black";  //ERROR (cosmetic): wires are grey (caused by alpha?)
    ctxLine.stroke();	
}

//Wire created when mouse button released (obsolete, now using 2-click placement).
/*function lineMouseUp(event)
{
    var temp;
    if (startX > endX)  //reverse wire direction if extending left of starting point
    {
    	temp = startX;
        startX = endX;
        endX = temp;
    }
    if (startY > endY)  //same if extending up
    {
    	temp = startY;
        startY = endY;
        endY = temp;
    }
    ctxLine.clearRect(0, 0, cvsLine.width, cvsLine.height);
    cvsLine.removeEventListener("mousemove", lineMouseMove, false); //wire has been placed, so no longer necessary
    cvsLine.removeEventListener("mouseup", lineMouseUp, false);     //to wait for mouse event.
    cvsLine.style.zIndex = -1;
    createWire();       //once the the wire has been drawn and its position is set, actually create the wire
}*/

function createWire()
{
    var rX = 0;     //wire rectangle variables
    var rY = 0;
    var rW = 0;
    var rH = 0;
    var newWire = new wire(startX, startY, endX, endY); //position set by lineMouse functions
    newWire.tips = [];
    if (startX == endX)		            //vertical wire
    {
    	rX = startX - (wiggleRoom / 2); //place wire in between grid lines.
      	rW = wiggleRoom;                //add 4 pixels of wiggle room the width of the wire so it is easier to click
        rY = startY;                    //Y-axis wiggle room not a factor because wire is vertical
	    rH = endY - startY;             //determine height of wire
    }
    else		                        //horizontal wire
    {
    	rX = startX;
	    rW = endX - startX;
        rY = startY - (wiggleRoom / 2);
        rH = wiggleRoom;
    }
    newWire.rect = new rectangle(rX, rY, rW, rH);       //clickable area of wire
    newWire.tips[0] = new tip(startX, startY, flowOff, newWire, stateDisconnect); //create 2 tips, 1 at start and 1 at end of wire
    newWire.tips[1] = new tip(endX, endY, flowOff, newWire, stateDisconnect); 

	connect(newWire);          //connect tips of new wire to tips of existing gates and wires, if applicable
	widgetArray.push(newWire); //add new wire to list of existing wires in the game
	refresh();
}



