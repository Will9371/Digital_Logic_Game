function createAnd(x, y)	//create an object of type "andGate"
{
    var newAndGate = null;

    var halfHeight = andImage.height / 2;    //used for placement of input tips
    var quarterHeight = andImage.height / 4; //at 1/4 and 3/4 up left side of gate
    var imageWidth = andImage.width / 2;     //and an output tip 1/2 the right side
    var imageHeight = andImage.height;
    
    newAndGate = new andGate();
    newAndGate.tips = [];
    newAndGate.rect = new rectangle(x, y, imageWidth, imageHeight);
    newAndGate.tips[0] = new tip(x, y + quarterHeight, flowIn, newAndGate, stateDisconnect);
    newAndGate.tips[1] = new tip(x, y + halfHeight + quarterHeight, flowIn, newAndGate, stateDisconnect);
    newAndGate.tips[2] = new tip(x + imageWidth, y + halfHeight, flowOut, newAndGate, stateOff);

    connect(newAndGate);            //check for connections to existing gates and wires
    newAndGate.draw();              //draw the and gate
    widgetArray.push(newAndGate);   //and add it to the list of existing widgets
}

function createNand(x, y)	//create an object of type "nandGate"
{
    var newNandGate = null;                     //0. Create an object
    
    var halfHeight = nandImage.height / 2;      //1. Determine tip locations
    var quarterHeight = nandImage.height / 4;
    var imageWidth = nandImage.width / 2;
    var imageHeight = nandImage.height;
    
    newNandGate = new nandGate();
    newNandGate.state = stateOn;                //2. Set the gate's initial state
    newNandGate.tips = [];
    newNandGate.rect = new rectangle(x, y, imageWidth, imageHeight);    //3. Create the bounding rectandle
    newNandGate.tips[0] = new tip(x, y + quarterHeight, flowIn, newNandGate, stateDisconnect);  //4. Create the tips
    newNandGate.tips[1] = new tip(x, y + halfHeight + quarterHeight, flowIn, newNandGate, stateDisconnect);
    newNandGate.tips[2] = new tip(x + imageWidth, y + halfHeight, flowOut, newNandGate, stateOn);
    connect(newNandGate);                       //5. Check for connections
    newNandGate.draw();                         //6. Draw the gate
    widgetArray.push(newNandGate);              //7. Add to list
}

function createOr(x, y)	
{
    var newOrGate = null;
    
    var halfHeight = orImage.height / 2;
    var quarterHeight = orImage.height / 4;
    var imageWidth = orImage.width / 2;
    var imageHeight = orImage.height;
    
    newOrGate = new orGate();
    newOrGate.tips = [];
    newOrGate.rect = new rectangle(x, y, imageWidth, imageHeight);
    newOrGate.tips[0] = new tip(x, y + quarterHeight, flowIn, newOrGate, stateDisconnect);
    newOrGate.tips[1] = new tip(x, y + halfHeight + quarterHeight, flowIn, newOrGate, stateDisconnect);    
    newOrGate.tips[2] = new tip(x + imageWidth, y + halfHeight, flowOut, newOrGate, stateOff);
    
    newOrGate.state = stateOff;
    connect(newOrGate);
    newOrGate.draw();
    widgetArray.push(newOrGate);
}

function createNor(x, y)	
{
    var newNorGate = null;
    
    var halfHeight = norImage.height / 2;
    var quarterHeight = norImage.height / 4;
    var imageWidth = norImage.width / 2;
    var imageHeight = norImage.height;
    
    newNorGate = new norGate();
    newNorGate.tips = [];
    newNorGate.rect = new rectangle(x, y, imageWidth, imageHeight);
    newNorGate.tips[0] = new tip(x, y + quarterHeight, flowIn, newNorGate, stateDisconnect);
    newNorGate.tips[1] = new tip(x, y + halfHeight + quarterHeight, flowIn, newNorGate, stateDisconnect);    
    newNorGate.tips[2] = new tip(x + imageWidth, y + halfHeight, flowOut, newNorGate, stateOn);
    
    newNorGate.state = stateOn;
    connect(newNorGate);
    newNorGate.draw();
    widgetArray.push(newNorGate);
}

function createXor(x, y)	
{
    var newXorGate = null;
    
    var halfHeight = xorImage.height / 2;
    var quarterHeight = xorImage.height / 4;
    var imageWidth = xorImage.width / 2;
    var imageHeight = xorImage.height;
    
    newXorGate = new xorGate();
    newXorGate.tips = [];
    newXorGate.rect = new rectangle(x, y, imageWidth, imageHeight);
    newXorGate.tips[0] = new tip(x, y + quarterHeight, flowIn, newXorGate, stateDisconnect);
    newXorGate.tips[1] = new tip(x, y + halfHeight + quarterHeight, flowIn, newXorGate, stateDisconnect);    
    newXorGate.tips[2] = new tip(x + imageWidth, y + halfHeight, flowOut, newXorGate, stateOff);
    
    newXorGate.state = stateOff;
    connect(newXorGate);
    newXorGate.draw();
    widgetArray.push(newXorGate);
}

//Add Xnor gate creation code here...

function createNot(x, y) //create an object of type "notGate"
{
    var newNotGate = null;
    
    var halfHeight = notImage.height / 2;
    var imageWidth = notImage.width / 2;
    var imageHeight = notImage.height;
    
    newNotGate = new notGate();
    newNotGate.tips = [];
    newNotGate.rect = new rectangle(x, y, imageWidth, imageHeight);
    newNotGate.tips[0] = new tip(x, y + halfHeight, flowIn, newNotGate, stateDisconnect);
    newNotGate.tips[1] = new tip(x + imageWidth, y + halfHeight, flowOut, newNotGate, stateOn);
    newNotGate.state = stateOn;
    connect(newNotGate);
    newNotGate.draw();
    widgetArray.push(newNotGate);
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
    //t.tips[0].state -> RED, t.tips[1].state -> GREEN, t.tips[2].state -> BLUE, t.tips[3].state -> OUTPUT
    if (t.tips[0].state == stateOn && t.tips[1].state != stateOn && t.tips[2].state != stateOn)
    {   //If ONLY the RED output is on (green and blue are either off or disconnected) -> RED
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateRed;
    }
    else if (t.tips[0].state != stateOn && t.tips[1].state == stateOn && t.tips[2].state != stateOn)
    {   //If ONLY the GREEN output is on -> GREEN
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateGreen;
    }
    else if (t.tips[0].state != stateOn && t.tips[1].state != stateOn && t.tips[2].state == stateOn)
    {   //If ONLY the BLUE output is on -> BLUE
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateBlue;
    }
    else if (t.tips[0].state == stateOn && t.tips[1].state == stateOn && t.tips[2].state != stateOn)
    {   //If RED and GREEN outputs are on -> YELLOW
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateYellow;
    }
    else if (t.tips[0].state == stateOn && t.tips[1].state != stateOn && t.tips[2].state == stateOn)
    {   //If RED and BLUE outputs are on -> PURPLE
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = statePurple;
    }
    else if (t.tips[0].state != stateOn && t.tips[1].state == stateOn && t.tips[2].state == stateOn)
    {   //If GREEN and BLUE outputs are on -> TEAL
        t.tips[3].state = stateOn;
        t.state = stateOn;
        widgetArray[4].color = stateTeal;
    }
    else if (t.tips[0].state == stateOn && t.tips[1].state == stateOn && t.tips[2].state == stateOn)
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

