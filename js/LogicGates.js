function createAnd(x, y)	//create an object of type "andGate"
{
    var newAndGate = createThreeTipGate(x, y, andImage, andGate, stateOff);
    widgetArray.push(newAndGate);   //add it to the list of existing widgets
}

function createNand(x, y)	//create an object of type "nandGate"
{
    var newNandGate = createThreeTipGate(x, y, nandImage, nandGate, stateOn);
    widgetArray.push(newNandGate); 
}

function createOr(x, y)	
{
    var newOrGate = createThreeTipGate(x, y, orImage, orGate, stateOff);
    widgetArray.push(newOrGate);
}

function createNor(x, y)	
{
    var newNorGate = createThreeTipGate(x, y, norImage, norGate, stateOn);
    widgetArray.push(newNorGate);
}
function createXor(x, y)    
{
    var newXorGate = createThreeTipGate(x, y, xorImage, xorGate, stateOff);
    widgetArray.push(newXorGate);
}
//Add Xnor gate creation code here...
function createNot(x, y)
{
    var newNotGate = createTwoTipGate(x, y, notImage, notGate, stateOn);
    widgetArray.push(newNotGate);
}

function createThreeTipGate(x, y, image, Gate, startingState)
{
    /* used for placement of input tips at 1/4 and 3/4 up left side of gate and an output tip 1/2 the right side */
    var imageHeight = image.height;
    var imageWidth = image.width;

    var quarterHeight = imageHeight / 4;
    var halfHeight = imageHeight / 2;
    var threeQuarterHeight = halfHeight + quarterHeight;
    var halfWidth = imageWidth / 2;

    var gate = new Gate();
    gate.tips = [];
    gate.rect = new rectangle(x, y, halfWidth, imageHeight);
    gate.tips[0] = new tip(x, y + quarterHeight, flowIn, gate, stateDisconnect);
    gate.tips[1] = new tip(x, y + threeQuarterHeight, flowIn, gate, stateDisconnect);    
    gate.tips[2] = new tip(x + halfWidth, y + halfHeight, flowOut, gate, startingState);
    connect(gate);  // Check for connections
    gate.draw();

    return gate;
}

function createTwoTipGate(x, y, image, Gate, startingState) 
{    
    var imageHeight = image.height;
    var imageWidth = image.width;

    var halfHeight = imageHeight / 2;
    var halfWidth = imageWidth / 2;
    
    var gate = new Gate();
    gate.tips = [];
    gate.rect = new rectangle(x, y, halfWidth, imageHeight);
    gate.tips[0] = new tip(x, y + halfHeight, flowIn, gate, stateDisconnect);
    gate.tips[1] = new tip(x + halfWidth, y + halfHeight, flowOut, gate, startingState);
    connect(gate);
    gate.draw();
    
    return gate;
}


function setNotState(nGate) //argument: object instance
{   //if 1 then 0, else 1
	nGate.visited++;        //for endless loop detection

    if (nGate.tips[0].state == stateOn)    //gate logic: invert signal
    {
    	nGate.state = stateOff;            //to set gate itself
        nGate.tips[1].state = stateOff;    //and its output
    }
    else
    {
    	nGate.state = stateOn;
        nGate.tips[1].state = stateOn;
    }
    if (nGate.tips[1].tipConnect != null)  //if output is connected to something else
    	setState(nGate.tips[1].tipConnect.owner); //set that widget's state (recursive)
}

function setAndState(aGate)
{   //if 1 and 1 then 1, else 0
	aGate.visited++;
    
	if (aGate.tips[0].state == stateOn && aGate.tips[1].state == stateOn)
    {
    	aGate.state = stateOn;
        aGate.tips[2].state = stateOn;
    }
    else
    {
    	aGate.state = stateOff;
        aGate.tips[2].state = stateOff;
    }
    if (aGate.tips[2].tipConnect != null)
    	setState(aGate.tips[2].tipConnect.owner);
}

function setNandState(nGate)
{   //if 1 and 1 then 0, else 1
	nGate.visited++;
    
	if (nGate.tips[0].state == stateOn && nGate.tips[1].state == stateOn)
    {
    	nGate.state = stateOff;
        nGate.tips[2].state = stateOff;
    }
    else
    {
    	nGate.state = stateOn;
        nGate.tips[2].state = stateOn;
    }
    if (nGate.tips[2].tipConnect != null)
    	setState(nGate.tips[2].tipConnect.owner);
}

function setOrState(oGate)
{   //if 1 or 1 then 1, else 0
	oGate.visited++;
    
	if (oGate.tips[0].state == stateOn || oGate.tips[1].state == stateOn)
    {
    	oGate.state = stateOn;
        oGate.tips[2].state = stateOn;
    }
    else
    {
    	oGate.state = stateOff;
        oGate.tips[2].state = stateOff;
    }
    if (oGate.tips[2].tipConnect != null)
    	setState(oGate.tips[2].tipConnect.owner);
}

function setNorState(nGate)
{   //if 1 or 1 then 0, else 1
	nGate.visited++;
    
	if (nGate.tips[0].state == stateOn || nGate.tips[1].state == stateOn)
    {
    	nGate.state = stateOff;
        nGate.tips[2].state = stateOff;
    }
    else
    {
    	nGate.state = stateOn;
        nGate.tips[2].state = stateOn;
    }
    if (nGate.tips[2].tipConnect != null)
    	setState(nGate.tips[2].tipConnect.owner);
}

function setXorState(xGate)
{   //if (1 and 0) or (0 and 1) then 1, else 0
	xGate.visited++;
    
	if ((xGate.tips[0].state == stateOn && xGate.tips[1].state != stateOn) ||
    	(xGate.tips[1].state == stateOn && xGate.tips[0].state != stateOn))
    {
    	xGate.state = stateOn;
        xGate.tips[2].state = stateOn;
    }
    else
    {
    	xGate.state = stateOff;
        xGate.tips[2].state = stateOff;
    }
    if (xGate.tips[2].tipConnect != null)
    	setState(xGate.tips[2].tipConnect.owner);
}

function setTerminalState(t)    //The terminal is the final output and used for the tesla coil
{                               //the terminal acts like a one-directional wire (diode)
    if (t.tips[Color.RED].state == stateOn && t.tips[Color.GREEN].state != stateOn && t.tips[Color.BLUE].state != stateOn)
    {   //If ONLY the RED output is on (green and blue are either off or disconnected) -> RED
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateRed;
    }
    else if (t.tips[Color.RED].state != stateOn && t.tips[Color.GREEN].state == stateOn && t.tips[Color.BLUE].state != stateOn)
    {   //If ONLY the GREEN output is on -> GREEN
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateGreen;
    }
    else if (t.tips[Color.RED].state != stateOn && t.tips[Color.GREEN].state != stateOn && t.tips[Color.BLUE].state == stateOn)
    {   //If ONLY the BLUE output is on -> BLUE
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateBlue;
    }
    else if (t.tips[Color.RED].state == stateOn && t.tips[Color.GREEN].state == stateOn && t.tips[Color.BLUE].state != stateOn)
    {   //If RED and GREEN outputs are on -> YELLOW
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateYellow;
    }
    else if (t.tips[Color.RED].state == stateOn && t.tips[Color.GREEN].state != stateOn && t.tips[Color.BLUE].state == stateOn)
    {   //If RED and BLUE outputs are on -> PURPLE
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = statePurple;
    }
    else if (t.tips[Color.RED].state != stateOn && t.tips[Color.GREEN].state == stateOn && t.tips[Color.BLUE].state == stateOn)
    {   //If GREEN and BLUE outputs are on -> TEAL
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateTeal;
    }
    else if (t.tips[Color.RED].state == stateOn && t.tips[Color.GREEN].state == stateOn && t.tips[Color.BLUE].state == stateOn)
    {   //If RED, GREEN, and BLUE outputs are on -> WHITE
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateWhite;
    }
    else
    {
    	t.tips[3].state = stateOff;
        t.state = stateOff;
        widgetArray[4].color = stateOff;
    }
}

