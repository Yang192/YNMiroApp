//#region Element onclick
var v2imgFrame = null;
var Items_v2imgFrame = null;
var element = document.getElementById("creat");
element.onclick = function()
{
  if(v2imgFrame == null)
  {
    const frame = getItemByTitle("PUZZLE_SYSTEM_V2IMG.", 'frame', function(item)
    {
      v2imgFrame = item;
      
      const v2img_items = getChildren(v2imgFrame, function(items)
      {
        Items_v2imgFrame = items;
        console.log("Items_v2imgFrame  length: "+ Items_v2imgFrame.length);
        const return_value = addPuzzleBoard();
      })       
    }); 
  }
  else
  {
    /*const v2img_items = getChildren(v2imgFrame, function(items)
    {
      Items_v2imgFrame = items;
      console.log("Items_v2imgFrame  length: "+ Items_v2imgFrame.length);
      const return_value = addPuzzleBoard();
    })   */
    const return_value = addPuzzleBoard();
  }

  //while(! hasFrame);

  //const children = await v2imgFrame.getChildren();
  //console.log("children.length : "+ children.length);

  // Specify all frame items on the board

 
}
//#endregion

async function getItemsInv2imgFrame(type)
{
  var Array = [];

  for(var i = 0; i < Items_v2imgFrame.length; i++)
  {
    if(Items_v2imgFrame[i].type === type)
    {
      Array.push(Items_v2imgFrame[i]);
    }
  }

  return Array;
}

//#region 
async function getChildren(frame, callback)
{
  const items = await frame.getChildren();
  callback(items);
}
//#endregion

//#region addSticky
async function addSticky() {
  const stickyNote = await miro.board.createStickyNote({
    content: 'Hello, World!!!@@##',
  });

  //await miro.board.viewport.zoomTo(stickyNote);
  return stickyNote;
}

//addSticky();
//#endregion

//#region getItem
async function getItemByTitle(title, typeName, callback)
{
  
  const items = await miro.board.get({type: typeName});
  var item = {x:0,y:0, title:'null',content:'null'};

  for(var i = 0; i < items.length; i++)
  {
    if(items[i].title.includes(title))
    {
      console.log("[getItemByTitle] 取得" + title + ", type : " + typeName);
      item  = items[i];
      break;
    } 
  }

  //console.log("[getItemByTitle] 沒有取得" + title + ", type : " + typeName);

  callback(item);
}

async function getItemByContent(content, typeName)
{
  
  const items = await getItemsInv2imgFrame(typeName);//miro.board.get({type: typeName});

  for(var i = 0; i < items.length; i++)
  {
    //var c = ;
    if(items[i].content.includes(content))
    {
      console.log("[getItemByContent] 取得" + content + ", type : " + typeName);
      return items[i];
    }
  }

  console.log("[getItemByContent] 沒有取得" + content + ", type : " + typeName);
  return {x:0,y:0, title:'null', content:'null'};
}
//#endregion

//#region addPuzzleBoard
async function addPuzzleBoard()
{
  const images = await getItemsInv2imgFrame('image');//miro.board.get({type: 'image'});
  const links = await getItemsInv2imgFrame("text");//miro.board.get({type: "text"});

  if(images.length === 0) return;
  const origArea = await getItemByContent("_1_", "shape");

  const newArea = await miro.board.createShape({
    shape: 'rectangle',
    style: {fillColor: '#000000',},
    x: origArea.x + 2500,
    y: origArea.y,
    width: 2200,
    height: 2400,
  });

  const offset = {x:origArea.x-newArea.x, y:origArea.y-newArea.y};
  
  for(var i = 0; i < images.length; i++)
  { 
    if(images[i].title == "IMG")
    {
      const return_value = copyImage(images[i], offset);
    }
  }

  for(var i = 0; i < links.length; i++)
  {  
    var c = links[i].content;
    if(c.includes('LINK'))
    {  
      const return_value = copyLink(links[i], offset);
    }
  }
}

async function copyImage(img, offset)
{
  const newImg = await  miro.board.createImage({
    title: 'PuzzleIMG',
    url: img.url,
    x: img.x - offset.x, // Default value: horizontal center of the board
    y: img.y - offset.y, // Default value: vertical center of the board
    width: img.width, // Set either 'width', or 'height'
    rotation: 0.0,
  });
}

async function copyLink(text, offset)
{
  const newImg = await  miro.board.createText({
    content : text.content.replace('LINK', '→URL'),
    style: text.style,
    x: text.x - offset.x, // Default value: horizontal center of the board
    y: text.y - offset.y, // Default value: vertical center of the board
    width: text.width, // Set either 'width', or 'height'
    rotation: 0.0,
  });
}
//#endregion
