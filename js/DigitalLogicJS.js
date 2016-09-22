function toolsClickHandler(event) 		//process mouse clicks in the tools division
{
    var target = event.target;
    switch(target.id)                   //determine which tool the user has clicked
    {
    	case "wireSelect":
        	tool = typeWire;
            break;
        case "connectSelect":
        	tool = typeConnect;
            break;
        case "trashSelect":
        	tool = typeTrash;
            break;
        case "clearSelect":
        	clearScreen();
        	break;
    }
    target.style.borderStyle = "solid"; //selected tool gets a solid border
    if(savedTarget != target && savedTarget != null)
        savedTarget.style.borderStyle = "dotted";   //previously selected box gets a dotted border
    savedTarget = target;               //remember what was selected last time
}

function clearScreen()
{
    for (i = 0; i < inputCount + 1; i++)    //for all inputs
    {
    	widgetArray[i].state = stateOff;    //set state to off
        widgetArray[i].tips[0].tipConnect = null; //set output tip on "inputs" to null  
        widgetArray[i].tips[0].state = stateOff;  //set output tip on "inputs" to off 
    }
    widgetArray.splice(inputCount + 1, (widgetArray.length - (inputCount + 1)));  //remove everything but the inputs 
    uniquePaths = inputCount;               //once the screen is cleared, there is only one wire path per input
    refresh();                              //update the screen, now with non-input widgets removed
}

function widgetsClickHandler(event)  		//process mouse clicks in the main canvas
{   
    var x = event.pageX - rectCanvas.left;  //determine where the user has clicked
    var y = event.pageY - rectCanvas.top;   //and offset based on cavas position on screen

    var existingObj = objectAtPoint(x, y);  //get the widget the user has clicked on
    if (existingObj != null)                //if the user has clicked on a widget (not "no widget")
    {
        if (existingObj.type == typeInput)  //if the widget is an input
            toggle(existingObj);            //toggle the input's state
        else
        {
            switch(tool)
            {
                case typeTrash:             //if the user has selected the trash tool
                    trash(existingObj);     //delete the widget clicked
                    break;
                case typeConnect:           //if the user has selected the connect tool
                    if (existingObj.type == typeWire)     //and has clicked a wire
                    {   
                        var wire1X = existingObj.fromX;   //obtain wire attributes
                        var wire1Y = existingObj.fromY;
                        var wire2X = existingObj.toX;
                        var wire2Y = existingObj.toY;
                        x = snapToGrid(x);
                        y = snapToGrid(y);
                        trash(existingObj);           //delete the wire
                        startX = wire1X;              //ERROR: existing connector on wire deleted (sometimes)
                        startY = wire1Y;              //(this doesn't happen when using trash tool on wire...)
                        endX = x;
                        endY = y;
                        createWire();                 //create a new wire from the beginning of the old wire to mouse location
                        startX = x;                       
                        startY = y;
                        endX = wire2X;
                        endY = wire2Y;
                        createWire();                 //create a new wire from mouse location to the end of the old wire
                        if(x != widgetArray[widgetArray.length-1].toX || y != widgetArray[widgetArray.length-1].toY)
                        {
                            createConnect(x, y, widgetArray[widgetArray.length-2]); //(connector added to 1st wire)
                        }
                        else
                        {
                            createConnect(x, y, widgetArray[widgetArray.length-1]); //(connector added to 2nd wire)
                        }                             //handles special case, preventing connector from moving

                        break;                        //and create a connector at the current mouse location.
                    }
            }
        }  
    }
}

function refresh()  //**Call this function whenever something in the game changes that could
{                   //alter the logical state of the wires and gates.
	ctx.clearRect(100, 0, rectCanvas.width, rectCanvas.height);    //clear the canvas
	for (i in widgetArray)              //draw all of the widgets present in the game
    	widgetArray[i].draw();
}

function toggle(inputObj)   //This function toggles inputs between their on and off states
{                           //when the user clicks on them
	clearVisited();                        //clear the visited attribute for all widgets
    if (inputObj.state == stateOff)        //switch the state of the input
    {
        inputObj.state = stateOn;
        inputObj.tips[0].state = stateOn;
    }
    else
    {
        inputObj.state = stateOff;
        inputObj.tips[0].state = stateOff;
    }
    inputObj.draw();
    if (inputObj.tips[0].tipConnect != null)    //if the input is connected to something
    	setState(inputObj);
}

function trash(trashObj) //delete a widget and break its connections to other widgets
{               //(recieves existingObj, which is the widget the user has clicked on)
	if (trashObj.type == typeInput || trashObj.type == typeTerminal)
    	return;                //do not delete inputs or output terminals
    clearVisited();            
    for (i in trashObj.tips)   //For each tip of the clicked widget
    {                          //(not relevant to widgets other than wires and inputs) 
        if (trashObj.tips[i].tipConnect != null)    //if the tip is connected to something
        {
            trashObj.tips[i].tipConnect.tipConnect = null;   //break the connection
            if (trashObj.tips[i].tipConnect.flow == flowIn)  //if the direction of flow in that connection was in
            {
        		trashObj.tips[i].tipConnect.flow = flowOff;  //set the flow state to off (because connection broken)
            	trashObj.tips[i].tipConnect.state = stateDisconnect;
                setState(trashObj.tips[i].tipConnect.owner); //reset the state of the logic gate on the
            }                                                //other end of the connection
        }
    }
	trashObj.erase();	  //Remove the clicked widget
	var trashIndex = widgetArray.indexOf(trashObj); 
    widgetArray.splice(trashIndex, 1);  //elinate that widget from the list of widgets present in the game
    if (trashObj.type == typeWire)      //refresh the screen if a wire was removed
    	refresh();
    if (trashObj.type == typeConnect)   //cut down on the number of paths if a connector was removed
        uniquePaths -= 3;               //I guess this is OK since there are more uniquePaths than needed...
}

function createConnect(x, y, w)	//creates a connector at the tip of a wire
{                               //('x', 'y' = mouse position; 'w' = widget (wire) clicked)
	if (w.tips.length > 2)	    //this wire already has a connector (i.e. has more than two tips)
      return;                   //ERROR: should be able to create a connector on either end of a wire
	dupTip = null;                 
    for (i in w.tips)           //for each tip of the wire
    {
    	if (ptInRect(x, y, w.tips[i].rect)) //if the user has clicked inside tip's rectangle
        {
        	dupTip = w.tips[i];             //create a temporary duplicate of that tip
            break;                          //and stop looking
        }
    }
    if (dupTip != null)         //if the user has clicked inside the rectangle of a tip
    {                           //create 2 new tips at the current location
		w.tips[2] = new tip(dupTip.x, dupTip.y, flowOut, w, dupTip.state);
        w.tips[3] = new tip(dupTip.x, dupTip.y, flowOut, w, dupTip.state);
        w.draw();               //and draw the new connector widget
    }
    uniquePaths += 3;
}

function connect(newObj)        //This function is called when creating a new wire or gate
{                               //and is passed newWire or newAndGate, newOrGate, etc.      
  	var arrayTip = null;        //wire starts off with no tips
    var newTip = null;
	var arrayObj = null;
	for (i1 in widgetArray)						    // for every object in the array of all created objects
    {
    	arrayObj = widgetArray[i1];
        if (arrayObj.type != typeWire && newObj.type != typeWire)  //at least one of the objects must be a wire
        	continue;           //arrayObj = item from widget array; newObj = a newly created wire or gate               
        for (i2 in arrayObj.tips)					// for every tip in the currently selected array object
        {
        	arrayTip = arrayObj.tips[i2];
            if (arrayTip.tipConnect == null)	    // if the tip is not already connected
            {
        		for (i3 in newObj.tips)				// for every tip in the newly created object
            	{
            		newTip = newObj.tips[i3];
                    if (newTip.tipConnect == null)	// if the new tip is not already connected
                    {	
                    	if (rectIntersect(arrayTip.rect, newTip.rect)) //if the new tip overlaps a widget
                        {                                              //then connect their tips
                        	connectTips(arrayTip, newTip);
                            break;                                     //and be finished searching
                        }
                    }	
                 }
           	}
        }
    }
    clearVisited();
    setState(newObj);
}

function connectTips(arrayTip, newTip)  //This function sets the flow state for tips
{                                       //when new wires and gates are added to the game area.
	arrayTip.tipConnect = newTip;  //connect the existing widget and the new tip to each other
    newTip.tipConnect = arrayTip;
    if (arrayTip.flow == flowOut)
    {   //if the existing widget was sending out a signal, the new tip will receive that signal
    	newTip.state = arrayTip.state;
        if (newTip.owner.type == typeWire)  //if the new tip is part of a wire
        	newTip.flow = flowIn;           //the direction of flow at the tip is in
    }
    if (newTip.flow == flowOut)   //same as above, but in reverse
    {
    	arrayTip.state = newTip.state;
        if (arrayTip.owner.type == typeWire)
        	arrayTip.flow = flowIn;
    }
}

function objectAtPoint(x, y)  //is there a widget at a given x/y?
{                             
	var returnObj = null;     //initialize to no object found
    for (i in widgetArray)    //check every widget in game
    {
    	testObj = widgetArray[i];
      
        if(ptInRect(x, y, widgetArray[i].rect))   //check if mouse location is within a widget
        {
        	returnObj = widgetArray[i];            //if it is, return the widget at the current array position
            break;                                 //and stop looking
        }
      
        if(testObj.type == typeWire)    //When testing click location for a wire, also look for tip rectangles
        {
          for(var j = 0; j < testObj.tips.length; j++)  //For each tip of the wire being examined
          {
            if(ptInRect(x, y, testObj.tips[j].rect))    //Check if the click was within the tip's rectangle
            {
              returnObj = widgetArray[i];               //if it is, return the wire to which the tip belongs
              break;                                    //ERROR: interferes with wire placement
            }
          }
        }
    }
    return returnObj;
}

function objectAtRectangle(r)   //this function checks if there is an object at a given location
{   //Called by allowDrag function, recieves info re widget user is attempting to drag into game area
	var returnObj = null;
    for (i in widgetArray)      //check all of the widgets in the game area
    {                           //if any of them intersect with the widget the user is trying to drop
        if (rectIntersect(r, widgetArray[i].rect))
        	returnObj = widgetArray[i];
    }
    return returnObj;           //return the existing object
}

function sleep(milliseconds)    //There is probably a library for this one...
{
  var start = new Date().getTime();
  while (true)
  {
    if ((new Date().getTime() - start) > milliseconds)
        break;
  }
}

function setState(obj)  //A general function that calls the appropriate setState 
{                       //function for each of the widget types.
    switch (obj.type)
    {
    	case typeWire:
        	setWireState(obj);
        	break;
        case typeNot:
        	setNotState(obj);
            break;
        case typeAnd:
        	setAndState(obj);
        	break;
        case typeNand:
        	setNandState(obj);
        	break;
        case typeOr:
        	setOrState(obj);
        	break;
        case typeNor:
        	setNorState(obj);
        	break;
        case typeXor:
        	setXorState(obj);
        	break;
        case typeTerminal:
        	setTerminalState(obj);
            break;
        case typeInput:
        	setInputState(obj);
            break;
	}
    obj.draw();
}

function setInputState(i) 
{
	i.tips[0].state = i.state; 
    if (i.tips[0].tipConnect != null)
    {   //pass the input state on to the tip it is connected to (if any)
    	i.tips[0].tipConnect.state = i.state;
    	i.tips[0].tipConnect.flow = flowIn;
    	setState(i.tips[0].tipConnect.owner);  //Recursively set the state of the widget
    }                                          //to which the tip is connected
}

function setWireState(w)
{
    w.visited++;                    //increment the number of times this wire has been visited
	if (w.visited > uniquePaths)    //to prevent an endless loop
    	return;
    var inTipFound = false;
    for (i1 in w.tips)              //for each of the wire's tips
    {   //if a signal is flowing into that tip, then it is receiving a signal from somewhere else
    	if (w.tips[i1].flow == flowIn)
        {
        	inTipFound = true;
            w.tips[i1].state = w.tips[i1].tipConnect.state; //recieve the state of the source to the tip
            w.state = w.tips[i1].state;     //change the state of the wire so it matches the state of the source
          for(i2 in w.tips)                 //for all of the wire's tips:
            {
            	if (w.tips[i2].flow != flowIn) //if they are not flowing in
                {                              //send the state of the wire out to those tips
                	outTip = w.tips[i2];
                	w.tips[i2].state = w.state;
                    w.tips[i2].flow = flowOut;
                    if (w.tips[i2].tipConnect != null)  //if a tip is connected to something
                    {
                    	if (w.tips[i2].tipConnect.owner.type == typeWire)  //if that something is a wire
                        	w.tips[i2].tipConnect.flow = flowIn;           //set that wire's connected tip to flow in
                        w.tips[i2].tipConnect.state = w.state;  //then the other widget's connected tip receives this wire's signal
                    	setState(w.tips[i2].tipConnect.owner);  //update the state of the connected widget
                    }                                           //in case the new signal source has changed it.
                }
            }
            break;
        }
    }
    if (inTipFound == false)    //if there are no signals flowing in to the wire
    {                           //then the wire must be disconnected
    	w.state = stateDisconnect;
        for (i in w.tips)       //so all of its tips
        {
        	w.tips[i].flow = flowOff;  //are not recieving any signal
            w.tips[i].state = stateDisconnect;  //are in a disconnected state
            if (w.tips[i].tipConnect != null)   //propogate disconnected state to the next tip and its owner
            {
            	w.tips[i].tipConnect.state = stateDisconnect;
                w.tips[i].tipConnect.flow = flowOff;
                setState(w.tips[i].tipConnect.owner);
            }
        }
    }
}

function snapToGrid(val) //snap the users mouse click to a 32x32 grid
{                        //called twice, once for an x value and once for a y value
      return(gridSize * Math.round(val/gridSize));
}

function clearVisited()     //sets the visited attribute for all widgets in the game to 0
{
	for (i in widgetArray)
    	widgetArray[i].visited = 0;
}

