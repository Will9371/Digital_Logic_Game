//Set the type and dimensions of the appropriate gate
function setGateTypeAndDrag(type, image)
{
  gateType = type;
  dragWidth = image.width / 2;
  dragHeight = image.height;
}
var gateDrags =
{
  orSelect:   function() { setGateTypeAndDrag(typeOr, orImage); },
  norSelect:  function() { setGateTypeAndDrag(typeNor, norImage); },
  andSelect:  function() { setGateTypeAndDrag(typeAnd, andImage); },
  nandSelect: function() { setGateTypeAndDrag(typeNand, nandImage); },
  notSelect:  function() { setGateTypeAndDrag(typeNot, notImage); },
  xorSelect:  function() { setGateTypeAndDrag(typeXor, xorImage); }
}

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

    //Detemine which gate has been selected by the user
    var selectedGate = event.target.id; 
    if(selectedGate in gateDrags) { gateDrags[selectedGate]() }
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
var gateXOffsets = 
{ 
  orSelect: 93,
  norSelect: 159,
  andSelect: 225,
  nandSelect: 291,
  xorSelect: 357,
  notSelect: 423
}
function getOffsetX(event)
{
  var offsetX;
  var gateType = event.target.id;
  console.log("gateType is", gateType);

  if(gateType in gateXOffsets) 
  {
    offsetX = event.clientX - gateXOffsets[gateType]
  }
  else 
  {
    console.error("unrecognized gate type");
  }
  return offsetX;
}

function getOffsetY(event)
{
  var offsetY = event.clientY - 83;
  return offsetY;
}

