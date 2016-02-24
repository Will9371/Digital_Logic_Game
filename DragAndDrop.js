function startDrag(event)		//User has begun a drag of a gate image
{   
    var offsetX = event.offsetX;
    var offsetY = event.offsetY;
    //console.log(event);
    if(event.offsetX == undefined)
      offsetX = getOffsetX(event);
    if(event.offsetY == undefined)
      offsetY = getOffsetY(event);
    //var offsetX = event.offsetX==undefined?event.layerX:event.offsetX;    //Kinda works for firefox, but way off sometimes
    //var offsetY = event.offsetY==undefined?event.layerY:event.offsetY;    //because layerX != offsetX
    event.dataTransfer.setData("offsetX", offsetX);     //dataTransfer and setData are built-in attributes of HTML5
    event.dataTransfer.setData("offsetY", offsetY);     //ERROR: Firefox does not support offsetX and offsetY properties
    //console.log("clientX", event.clientX, "clientY", event.clientY);
    //console.log("OffsetX", offsetX, "OffsetY", offsetY); 
    //console.log("adjustX", offsetX - event.clientX, "adjustY", offsetY - event.clientY);
    switch(event.target.id)     //Detemine which gate has been selected by the user
    {
        case "orSelect":
			gateType = typeOr;  //Set the type and dimensions of the appropriate gate
            dragWidth = orImage.width / 2;
            dragHeight = orImage.height;
            break;
        case "norSelect":
			gateType = typeNor;
            dragWidth = norImage.width / 2;
            dragHeight = norImage.height;
            break;
        case "andSelect":
        	gateType = typeAnd;
            dragWidth = andImage.width / 2;
            dragHeight = andImage.height;
            break;
        case "nandSelect":
        	gateType = typeNand;
            dragWidth = nandImage.width / 2;
            dragHeight = nandImage.height;
            break;
        case "notSelect":
        	gateType = typeNot;
            dragWidth = notImage.width / 2;
            dragHeight = notImage.height;
            break;
        case "xorSelect":
        	gateType = typeXor;
            dragWidth = xorImage.width / 2;
            dragHeight = xorImage.height;
            break;
    }
}

function allowDrag(event)		//override default behavior which does not allow drag
{
	var dragOffsetX = event.dataTransfer.getData("offsetX");
    var dragOffsetY = event.dataTransfer.getData("offsetY");
    
    var x = event.pageX - rectCanvas.left - dragOffsetX; 
    var y = event.pageY - rectCanvas.top  - dragOffsetY + padding;  
    var r = new rectangle(x, y, dragWidth, dragHeight);
    if (objectAtRectangle(r) == null)
    	event.preventDefault(); 
    //console.log("allowDrag:", dragOffsetX, dragOffsetY);
}

function dropWidget(event)		//user has dropped a gate image on the canvas
{
	event.preventDefault();
    
    var dragOffsetX = event.dataTransfer.getData("offsetX");
    var dragOffsetY = event.dataTransfer.getData("offsetY");
    
    var x = event.pageX - rectCanvas.left - dragOffsetX; 
    var y = event.pageY - rectCanvas.top  - dragOffsetY + padding;  
    x = snapToGrid(x);	
    y = snapToGrid(y);						
	
    switch(gateType)
    {
    	case typeOr:
    		createOr(x, y);
            break;
        case typeNor:
    		createNor(x, y);
            break;
        case typeAnd:
        	createAnd(x, y);
            break;
        case typeNand:
        	createNand(x, y);
            break;
        case typeNot:
        	createNot(x, y);
            break;
        case typeXor:
        	createXor(x, y);
            break;
        default:
        	//console.log("Unrecognized gate type = " + gateType);
    }
}

function getOffsetX(event)
{
  var offsetX;
  var gateType = event.target.id;
  console.log("gateType is", gateType);
  switch(gateType)
  {
    case "orSelect":
      offsetX = event.clientX - 93;
      break;
    case "norSelect":
      offsetX = event.clientX - 159;
      break;
    case "andSelect":
      offsetX = event.clientX - 225;
      break;
    case "nandSelect":
      offsetX = event.clientX - 291;
      break;
    case "xorSelect":
      offsetX = event.clientX - 357;
      break;
    case "notSelect":
      offsetX = event.clientX - 423;
      break;
    default:
      console.log("unrecognized gate type");
  }
  
  return offsetX;
}

function getOffsetY(event)
{
  var offsetY = event.clientY - 83;
  return offsetY;
}

